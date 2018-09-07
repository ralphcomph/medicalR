import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { LocalDataSource } from 'ng2-smart-table';
import { UsuarioService } from '../../shared/services/usuario.service'
import { Usuario } from '../../shared/models/usuario.model'
import { PerfilService } from '../../shared/services/perfil.service'
//import { Perfil } from '../../shared/models/perfil.model'

import { AutenticacaoService } from '../../shared/services/autenticacao.service'
import { AngularFireDatabase } from 'angularfire2/database'

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
      delete: false,
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
      email: {
        title: 'E-mail',
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
    edit: {
      editButtonContent: '<i class="fa fa-pencil-square">&nbsp;&nbsp;</i>',
      saveButtonContent: '<i class="fa fa-floppy-o">&nbsp;&nbsp;</i>',
      cancelButtonContent: '<i class="fa fa-undo"></i>',
      confirmSave: true,
    },
  };

  private source: LocalDataSource;
  private UsuarioLogado: string;
  private PerfilLogado: string;

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private firebase: AngularFireDatabase,
    private autenticacaoService: AutenticacaoService
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
          field: 'email',
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

  oneditConfirm(event) {   
    if (this.PerfilLogado !== "Administrador") {
      alert("Acesso negado!");    
    }else {    
    this.usuarioService.updateUsuario(event.newData)
    event.confirm.resolve(event.newData);
    }
  }

  ngOnInit() {

    this.autenticacaoService.getAuth().subscribe(auth => {
      if (auth) {
        this.UsuarioLogado = auth.email;

        let subscribe = this.firebase.object(`usuarios_info/${btoa(auth.email)}`).valueChanges().subscribe(
          data => {
            this.PerfilLogado = data["perfil"];           
          }
        );
      } else {
      }
    });

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
