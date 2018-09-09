import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LocalDataSource } from 'ng2-smart-table';
import { PacienteService } from '../../shared/services/paciente.service'
import { Paciente } from '../../shared/models/paciente.model'

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
  providers: [PacienteService],
  animations: [routerTransition()]
})

export class PacienteComponent implements OnInit {

  public newId: number;
  private feedback: string;
  private msn: string;

  public formPaciente: FormGroup = new FormGroup({
    'cpf': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)])
  })

  settings = {
    mode: 'inline',
    hideHeader: false,
    hideSubHeader: true,
    noDataMessage: "Nenhum paciente cadastrado",
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
      cpf: {
        title: 'CPF',
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
    private pacienteService: PacienteService
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
          field: 'cpf',
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
    this.pacienteService.CreatePaciente(event.newData);
    event.confirm.resolve(event.newData);
  }

  oneditConfirm(event) {
    if (event.newData["nome"].length < 3 || event.newData["nome"].length > 40) {
      this.feedback = "danger";
      this.msn = "Nome do paciente deve conter no mín. 3 e no máx. 40 ";
      setTimeout(() => {
        this.feedback = null;
        this.msn = null;
      }, 3000);
    } else {
      this.pacienteService.SelectPacienteByCPF(event.newData["cpf"])
        .then((paciente: Paciente[]) => {
          if ((paciente.length > 0) && (paciente[0].id !== event.newData["id"])) {
            this.feedback = "danger";
            this.msn = "CPF já está cadastrado!";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            this.pacienteService.UpdatePaciente(event.newData)
              .subscribe((id: number) => {
                this.newId = id
              })
            event.confirm.resolve(event.newData);
          }
        })
    }
  }

  ondeleteConfirm(event) {
    if (window.confirm('Tem certeza que deseja excluir o paciente ' + event.data.cpf + '?')) {
      this.pacienteService.DeletePaciente(event.data)
        .subscribe(() => {
        })
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.pacienteService.SelectPacienteAll()
      .then((paciente: Paciente[]) => {
        this.source.load(paciente)
      })
  }

  public CriarPaciente(): void {
    this.pacienteService.SelectPacienteByCPF(this.formPaciente.value.cpf)
      .then((paciente: Paciente[]) => {
        if (paciente.length > 0) {
          this.feedback = "danger";
          this.msn = "CPF já está cadastrado!";
          setTimeout(() => {
            this.feedback = null;
            this.msn = null;
          }, 3000);
        }
        else {
          if (isNaN(this.formPaciente.value.cpf)) {
            this.feedback = "danger";
            this.msn = "Campo CPF deve conter somente números!";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            if (this.formPaciente.status === 'INVALID') {
              this.formPaciente.get('cpf').markAsTouched()
              this.formPaciente.get('nome').markAsTouched()             
            } else {
              let paciente: Paciente = new Paciente(
                null,
                this.formPaciente.value.cpf,
                this.formPaciente.value.nome,
                false
              )

              this.pacienteService.CreatePaciente(paciente)
                .subscribe((id: number) => {
                  this.feedback = "success";
                  this.msn = "Paciente " + id + " criado com sucesso!";
                  this.formPaciente.reset();

                  setTimeout(() => {
                    this.feedback = null;
                    this.msn = null;
                  }, 3000);

                  this.pacienteService.SelectPacienteAll()
                    .then((paciente: Paciente[]) => {
                      this.source.load(paciente)
                    })
                })
            }
          }
        }
      })
  }

  public CancelarPaciente(): void {
    this.formPaciente.reset();
  }
}
