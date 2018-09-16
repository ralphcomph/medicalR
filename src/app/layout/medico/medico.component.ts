import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LocalDataSource } from 'ng2-smart-table';
import { MedicoService } from '../../shared/services/medico.service'
import { Medico } from '../../shared/models/medico.model'
import { EspecialidadeService } from '../../shared/services/especialidade.service'
import { Especialidade } from '../../shared/models/especialidade.model'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss'],
  providers: [MedicoService, EspecialidadeService],
  animations: [routerTransition()]
})

export class MedicoComponent implements OnInit {

  public newId: number;
  private feedback: string;
  private msn: string;
  settings: Object;

  source: LocalDataSource;
  EspecialidadeList = [];
  id_esp: number;

  public formMedico: FormGroup = new FormGroup({
    'crm': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'id_esp': new FormControl(null, [Validators.required])
  })  

  selectOption(id: any): void {   
    this.id_esp = id;    
  }

  constructor(
    private medicoService: MedicoService,
    private especialidadeService: EspecialidadeService
  ) {    

    this.especialidadeService.SelectEspecialidadeAll()
    .then((especialidade: Especialidade[]) => {          
      this.EspecialidadeList = especialidade.map(arr => { return {value: arr.id, title: arr.descricao};});   
    
    })     
    
    this.medicoService.SelectMedicoAll()
    .then((medico: Medico[]) => { 
     
      this.source = new LocalDataSource();      
      this.source.load(medico)    
      this.settings = this.loadTableSettings()
    })    
  
  }  

  loadTableSettings() {
    return {
      mode: 'inline',
      hideHeader: false,
      hideSubHeader: true,
      noDataMessage: "Nenhum paciente cadastrado",
      actions: {
        columnTitle: "",       
        edit: true,
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
        crm: {
          title: 'CRM',
          filter: false,
        },
        nome: {
          title: 'Nome',
          filter: false,
        },
       
        id_esp: {
          title: 'Especialidade',
          valuePrepareFunction: (value) => {                 
            return this.EspecialidadeList.filter(arr => arr.value === parseInt(value))[0].title;
          },
          filter: true,
          type: 'text',
          editor: {
            type: 'list',
            config: {                
              list: this.EspecialidadeList,            
            },
          },         
        }
      },
      add: {
        addButtonContent: '<i class="fa fa-plus-square fa-3x"></i>',
        createButtonContent: '<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>',
        cancelButtonContent: '<i class="fa fa-ban"></i>',
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
          field: 'crm',
          search: query
        },
        {
          field: 'nome',
          search: query
        },
        {
          field: 'id_esp',
          search: query,
          //filter: (cell?: any, search?: string) => {
           //console.log(cell)
           //console.log(search)
           //return true 
        //}            
        }            
      ], false);
    }
  }

  oncreateConfirm(event) {
    this.medicoService.CreateMedico(event.newData);
    event.confirm.resolve(event.newData);
  }

  oneditConfirm(event) {  
    if (event.newData["nome"].length < 3 || event.newData["nome"].length > 40) {
      this.feedback = "danger";
      this.msn = "Nome do médico deve conter no mín. 3 e no máx. 40 ";
      setTimeout(() => {
        this.feedback = null;
        this.msn = null;
      }, 3000);
    } else {
      this.medicoService.SelectMedicoByCRM(event.newData["crm"])
        .then((medico: Medico[]) => {
          if ((medico.length > 0) && (medico[0].id !== event.newData["id"])) {
            this.feedback = "danger";
            this.msn = "CRM já está cadastrado.";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            this.medicoService.UpdateMedico(event.newData)
              .subscribe((id: number) => {
                this.newId = id
              })
            event.confirm.resolve(event.newData);
          }
        })
    }
  }

  ondeleteConfirm(event) {
    if (window.confirm('Tem certeza que deseja excluir o médico ' + event.data.crm + '?')) {
      this.medicoService.DeleteMedico(event.data)
        .subscribe(() => {
        })
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
 
  }

  public CriarMedico(): void {
    this.medicoService.SelectMedicoByCRM(this.formMedico.value.crm)
      .then((medico: Medico[]) => {
        if (medico.length > 0) {
          this.feedback = "danger";
          this.msn = "CRM já está cadastrado.";
          setTimeout(() => {
            this.feedback = null;
            this.msn = null;
          }, 3000);
        }
        else {
          if (isNaN(this.formMedico.value.crm)) {
            this.feedback = "danger";
            this.msn = "Campo CRM deve conter somente números!";
            setTimeout(() => {
              this.feedback = null;
              this.msn = null;
            }, 3000);
          }
          else {
            if (this.formMedico.status === 'INVALID') {
              this.formMedico.get('crm').markAsTouched()
              this.formMedico.get('nome').markAsTouched()
              this.formMedico.get('id_esp').markAsTouched()
            } else {            
              let medico: Medico = new Medico(
                null,
                this.formMedico.value.crm,            
                this.formMedico.value.nome,
                this.id_esp,
                false
              )            
              this.medicoService.CreateMedico(medico)
                .subscribe((id: number) => {
                  this.feedback = "success";
                  this.msn = "Médico " + id + " criado com sucesso.";
                  this.formMedico.reset();

                  setTimeout(() => {
                    this.feedback = null;
                    this.msn = null;
                  }, 3000);

                  this.medicoService.SelectMedicoAll()
                    .then((medico: Medico[]) => {
                      this.source.load(medico)
                    })
                })
            }
          }
        }
      })
  }

  public CancelarMedico(): void {
    this.formMedico.reset();
  }
}
