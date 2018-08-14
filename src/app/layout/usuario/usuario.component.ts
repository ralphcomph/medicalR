import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { LocalDataSource } from 'ng2-smart-table';
import { UsuarioService } from '../../shared/services/usuario.service'
import { Usuario } from '../../shared/models/usuario.model'
import { PerfilService } from '../../shared/services/perfil.service'
import { Perfil } from '../../shared/models/perfil.model'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [UsuarioService, PerfilService],
  animations: [routerTransition()]
})

//type Fil = { value: string; title: string };

export class UsuarioComponent implements OnInit {

  public perfil_data: Perfil[];
  public usuarioId: number;
  
  //public fil_data: Fil[];

  settings = {
    mode: 'inline',
    hideHeader: false,
    hideSubHeader: true,
    noDataMessage: "Nenhum usuário cadastrado",  
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
      perfil: {
        title: 'Perfil',
        filter: false,
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [   
              {
                value: 'Administrador',
                title: 'Administrador',             
              },
              {
                value: 'Recepcionista',      
                title: 'Recepcionista',                
              },
              {
                value: 'Paciente',
                title: 'Paciente',               
              },
              {
                value: 'Médico',  
                title: 'Médico',                
              }
            ],
          },
        },
      },     
      nome: {
        title: 'Nome',
        filter: false,
      }
    },
    add: {
      addButtonContent: '<i class="fa fa-plus-square fa-3x"></i>',
      createButtonContent: '<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>',
      cancelButtonContent: '<i class="fa fa-ban"></i>',
      confirmCreate: true,
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
    private usuarioService: UsuarioService,
    private perfilService: PerfilService
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
        },
        {
          field: 'perfil',
          search: query
        }     
      ], false);
    }
  }

  oncreateConfirm(event) {
    this.usuarioService.CreateUsuarios(event.newData, 0);     
    event.confirm.resolve(event.newData);  
  }

  oneditConfirm(event) {
    this.usuarioService.UpdateUsuarios(event.newData, 0)
      .subscribe((id: number) => {
        this.usuarioId = id
      })
    event.confirm.resolve(event.newData);   
  }

  ondeleteConfirm(event) {
    this.usuarioService.DeleteUsuarios(event.data, 1)
      .subscribe(() => {
      })
    event.confirm.resolve(event.data);    
  }

  ngOnInit() { 

    //this.fil_data.push({value : "1" , title : "teste 1"});
    //this.fil_data.push({value : "2" , title : "teste 2"});
    //this.fil_data.push({value : "3" , title : "teste 3"});  

    //this.perfilService.SelectPerfil()
    //  .then((perfil: Perfil[]) => {
    //     this.perfil_data = perfil 
    //    console.log(this.perfil_data)
    //  })  

    this.usuarioService.SelectUsuarios()
      .then((usuario: Usuario[]) => {
        this.source.load(usuario)       
      })  
  }
}
