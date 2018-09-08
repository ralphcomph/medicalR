import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LocalDataSource } from 'ng2-smart-table';
import { RemedioService } from '../../shared/services/remedio.service'
import { Remedio } from '../../shared/models/remedio.model'

@Component({
  selector: 'app-remedio',
  templateUrl: './remedio.component.html',
  styleUrls: ['./remedio.component.scss'],
  providers: [RemedioService],
  animations: [routerTransition()]
})

export class RemedioComponent implements OnInit {

  public newId: number;
  private feedback: string;
  private msn: string;

  public formRemedio: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)])
  })

  settings = {
    mode: 'inline',
    hideHeader: false,
    hideSubHeader: true,
    noDataMessage: "Nenhum remédio cadastrado",
    actions: {
      columnTitle: "",
      add: false,
    },
    attr: {
      class: 'table table-bordered'
    },
    columns: {
      id: {
        title: 'ID',
        filter: false,
        editable: false,
        addable: false,
      },
      nome: {
        title: 'Nome',
        filter: false,
      }
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil-square">&nbsp;&nbsp;</i>',
      saveButtonContent: '<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>',
      cancelButtonContent: '<i class="fa fa-ban"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash">&nbsp;&nbsp;</i>',
      confirmDelete: true,
    },
  };

  source: LocalDataSource;

  constructor(
    private remedioService: RemedioService
  ) {
    this.source = new LocalDataSource();
  }

  onSearch(query: string = '') {
    if (query === '') {
      this.source.setFilter([]);
    }
    else {
      this.source.setFilter([
        {
          field: 'id',
          search: query
        },
        {
          field: 'nome',
          search: query
        }
      ], false);
    }
  }

  oncreateConfirm(event) {
    this.remedioService.CreateRemedio(event.newData);
    event.confirm.resolve(event.newData);
  }

  oneditConfirm(event) {
    if (event.newData["nome"].length < 3 || event.newData["nome"].length > 40) {
      this.feedback = "danger";
      this.msn = "Nome do remédio deve conter no mín. 3 e no máx. 40 ";
      setTimeout(() => {
        this.feedback = null;
        this.msn = null;
      }, 3000);
    } else {
      this.remedioService.SelectRemedioByNome(event.newData["nome"])
        .then((remedio: Remedio[]) => {           
          if ((remedio.length > 0) && (remedio[0].id !== event.newData["id"])) {
            this.feedback = "danger";
            this.msn = "Nome já está cadastrado!";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            this.remedioService.UpdateRemedio(event.newData)
              .subscribe((id: number) => {
                this.newId = id
              })
            event.confirm.resolve(event.newData);
          }
        })
    }
  }

  ondeleteConfirm(event) {
    if (window.confirm('Tem certeza que deseja excluir o remédio ' + event.data.nome + '?')) {
      this.remedioService.DeleteRemedio(event.data)
        .subscribe(() => {
        })
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.remedioService.SelectRemedioAll()
      .then((remedio: Remedio[]) => {
        this.source.load(remedio)
      })
  }

  public CriarRemedio(): void {
    this.remedioService.SelectRemedioByNome(this.formRemedio.value.nome)
      .then((remedio: Remedio[]) => {     
        if (remedio.length > 0) {
          this.feedback = "danger";
          this.msn = "Nome já está cadastrado!";
          setTimeout(() => {
            this.feedback = null;
            this.msn = null;
          }, 3000);
        }
        else {
          if (this.formRemedio.status === 'INVALID') {
            this.formRemedio.get('nome').markAsTouched()
          } else {
            let remedio: Remedio = new Remedio(
              null,
              this.formRemedio.value.nome,
              false
            )

            this.remedioService.CreateRemedio(remedio)
              .subscribe((id: number) => {
                this.feedback = "success";
                this.msn = "Remédio " + id + " criado com sucesso!";
                this.formRemedio.reset();

                setTimeout(() => {
                  this.feedback = null;
                  this.msn = null;
                }, 3000);

                this.remedioService.SelectRemedioAll()
                  .then((remedio: Remedio[]) => {
                    this.source.load(remedio)
                  })
              })
          }

        }
      })
  }
  public CancelarRemedio(): void {
    this.formRemedio.reset();
  }
}
