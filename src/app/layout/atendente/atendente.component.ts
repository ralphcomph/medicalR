import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LocalDataSource } from 'ng2-smart-table';
import { AtendenteService } from '../../shared/services/atendente.service'
import { Atendente } from '../../shared/models/atendente.model'

@Component({
  selector: 'app-atendente',
  templateUrl: './atendente.component.html',
  styleUrls: ['./atendente.component.scss'],
  providers: [AtendenteService],
  animations: [routerTransition()]
})

export class AtendenteComponent implements OnInit {

  public newId: number;
  private feedback: string;
  private msn: string;

  public formAtendente: FormGroup = new FormGroup({
    'ctps': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)])
  })

  settings = {
    mode: 'inline',
    hideHeader: false,
    hideSubHeader: true,
    noDataMessage: "Nenhum atendente cadastrado",
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
      ctps: {
        title: 'CTPS',
        filter: false,      
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
    private atendenteService: AtendenteService
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
          field: 'ctps',
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
    this.atendenteService.CreateAtendente(event.newData);
    event.confirm.resolve(event.newData);
  }

  oneditConfirm(event) {
    if (event.newData["nome"].length < 3 || event.newData["nome"].length > 40) {
      this.feedback = "danger";
      this.msn = "Nome atendente deve conter no mín. 3 e no máx. 40 ";
      setTimeout(() => {
        this.feedback = null;
        this.msn = null;
      }, 3000);
    } else {
      this.atendenteService.SelectAtendenteByCTPS(event.newData["ctps"])
        .then((atendente: Atendente[]) => {
          if ((atendente.length > 0) && (atendente[0].id !== event.newData["id"])) {
            this.feedback = "danger";
            this.msn = "CTPS já está cadastrado!";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            this.atendenteService.UpdateAtendente(event.newData)
              .subscribe((id: number) => {
                this.newId = id
              })
            event.confirm.resolve(event.newData);
          }
        })
    }
  }

  ondeleteConfirm(event) {
    if (window.confirm('Tem certeza que deseja excluir o atendente ' + event.data.ctps + '?')) {
      this.atendenteService.DeleteAtendente(event.data)
        .subscribe(() => {
        })
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.atendenteService.SelectAtendenteAll()
      .then((atendente: Atendente[]) => {
        this.source.load(atendente)
      })
  }

  public CriarAtendente(): void {
    this.atendenteService.SelectAtendenteByCTPS(this.formAtendente.value.ctps)
      .then((atendente: Atendente[]) => {
        if (atendente.length > 0) {
          this.feedback = "danger";
          this.msn = "CTPS já está cadastrado!";
          setTimeout(() => {
            this.feedback = null;
            this.msn = null;
          }, 3000);
        }
        else {
          if (isNaN(this.formAtendente.value.ctps)) {
            this.feedback = "danger";
            this.msn = "Campo CTPS deve conter somente números!";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            if (this.formAtendente.status === 'INVALID') {
              this.formAtendente.get('nome').markAsTouched()
              this.formAtendente.get('ctps').markAsTouched()
            } else {
              let atendente: Atendente = new Atendente(
                null,
                this.formAtendente.value.ctps,
                this.formAtendente.value.nome,
                false
              )

              this.atendenteService.CreateAtendente(atendente)
                .subscribe((id: number) => {
                  this.feedback = "success";
                  this.msn = "Atendente " + id + " criado com sucesso!";
                  this.formAtendente.reset();

                  setTimeout(() => {
                    this.feedback = null;
                    this.msn = null;
                  }, 3000);

                  this.atendenteService.SelectAtendenteAll()
                    .then((atendente: Atendente[]) => {
                      this.source.load(atendente)
                    })
                })
            }
          }
        }
      })
  }

  public CancelarAtendente(): void {
    this.formAtendente.reset();
  }
}
