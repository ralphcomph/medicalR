import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LocalDataSource } from 'ng2-smart-table';
import { UsuarioService } from '../../shared/services/usuario.service'
import { Usuario } from '../../shared/models/usuario.model'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [UsuarioService],
  animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario[];
  public usuarioId: number;
  public idPedidoCompra: number

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
        defaultValue: '000',      
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

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [ Validators.required ])
  })

  constructor(private usuarioService: UsuarioService) {
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
          field: 'email',
          search: query
        }
      ], false);
    }
  }

  oncreateConfirm(event) {
    this.usuarioService.CreateUsuarios(event.newData, 0)
      .subscribe((id: number) => {
        this.usuarioId = id
      })
    event.confirm.resolve(event.newData);
    //this.source.refresh 
  }

  oneditConfirm(event) {
    this.usuarioService.UpdateUsuarios(event.newData, 0)
      .subscribe((id: number) => {
        this.usuarioId = id
      })
    event.confirm.resolve(event.newData);
    //this.source.refresh
  }

  ondeleteConfirm(event) {
    this.usuarioService.DeleteUsuarios(event.data, 1)
      .subscribe(() => {
      })
    event.confirm.resolve(event.data);
    //this.source.refresh
  }

  ngOnInit() {
    this.usuarioService.SelectUsuarios()
      .then((usuario: Usuario[]) => {
        this.source.load(usuario)       
      })      
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      console.log('formulário está inválido')

      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    
    } 
  }
}
