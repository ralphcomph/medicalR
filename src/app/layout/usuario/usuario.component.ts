import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
    
    settings = {
      add: {
        addButtonContent: '<i class="fa fa-plus-square fa-3x"></i>',
        createButtonContent: '<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>',
        cancelButtonContent: '<i class="fa fa-ban"></i>',
      },
      edit: {
        editButtonContent: '<i class="fa fa-pencil-square">&nbsp;&nbsp;</i>',
        saveButtonContent: '<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>',
        cancelButtonContent: '<i class="fa fa-ban"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash">&nbsp;&nbsp;</i>',
        confirmDelete: true,
      },
        columns: {         
          perfil: {
            title: 'Perfil',
            filter: false,

          },
          nome: {
            title: 'Nome',
            filter: false,
          },
          email: {
            title: 'E-mail',
            filter: false,
          },
          senha: {
            title: 'Senha',
            filter: false,
          }
        }
      };

      data = [
        {
          id: 1,
          perfil: "Indefinido",
          nome: "João Augusto",
          email: "joao@augusto.com.br",
          senha:"*******"
        },
        {
          id: 2,
          perfil: "Indefinido",
          nome: "Maria Aparecida",
          email: "maria@aparecida.com.br",
          senha:"*******"
        },          
        {
          id: 3,
          perfil: "Administrador",
          nome: "Ralph Souza",
          email: "ralph@souza.com.br",
          senha:"*******"
        }
      ];

    source: LocalDataSource;
      
    constructor() {
      this.source = new LocalDataSource(this.data);
    }

    onSearch(query: string = '') {
      this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'id',
          search: query
        },
        {
          field: 'name',
          search: query
        },
        {
          field: 'username',
          search: query
        },
        {
          field: 'email',
          search: query
        }
      ], false); 
    }
    ngOnInit() {}
}
