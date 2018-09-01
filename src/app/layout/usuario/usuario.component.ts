import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { LocalDataSource } from 'ng2-smart-table';
import { UsuarioService } from '../../shared/services/usuario.service'
import { Usuario } from '../../shared/models/usuario.model'
import { PerfilService } from '../../shared/services/perfil.service'
//import { Perfil } from '../../shared/models/perfil.model'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [UsuarioService, PerfilService],
  animations: [routerTransition()]
})

export class UsuarioComponent implements OnInit {
  
  public usuarioId: number;
  usuarioList: Usuario[];  

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
      nome: {
        title: 'Nome',
        filter: false,
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
                value: 'Atendente',
                title: 'Atendente',
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
    this.usuarioService.CreateUsuarios(event.newData);
    event.confirm.resolve(event.newData);
  }

  oneditConfirm(event) {
    this.usuarioService.UpdateUsuarios(event.newData)
      .subscribe((id: number) => {
        this.usuarioId = id
      })
    event.confirm.resolve(event.newData);
  }

  ondeleteConfirm(event) {
    if (window.confirm('Tem certeza que deseja excluir o usuário ' + event.data.id + ' ?')) {
      this.usuarioService.DeleteUsuarios(event.data)
        .subscribe(() => {
        })
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {  

    var x = this.usuarioService.getData();
    x.snapshotChanges().subscribe(item => {
      this.usuarioList = [];
      item.forEach(element => {
        var data = element.payload.toJSON();
       
        data["$key"] = element.key;       

        let usuario: Usuario = new Usuario(
          data["$key"],
          data["perfil"],
          data["nome"],
          data["email"],
          data["senha"]
      )    
      this.usuarioList.push(usuario) 
      }); 
    
      this.source.load(this.usuarioList)
    });   
  }
}
