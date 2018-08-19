import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

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

  public atendenteId: number; 

  settings = {
    mode: 'inline',
    hideHeader: false,
    hideSubHeader: false,
    noDataMessage: "Nenhum atendente cadastrado",
    actions: {
      columnTitle: "",
      add: true,
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
      ctps: {
        title: 'CTPS',
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
          field: 'nome',
          search: query
        },
        {
          field: 'ctps',
          search: query
        }
      ], false);
    }
  }

  oncreateConfirm(event) {
    console.log(event.data);
    this.atendenteService.CreateAtendentes(event.newData);
    event.confirm.resolve(event.newData);
  }

  oneditConfirm(event) {
    this.atendenteService.UpdateAtendentes(event.newData)
      .subscribe((id: number) => {
        this.atendenteId = id
      })
    event.confirm.resolve(event.newData);
  }

  ondeleteConfirm(event) {
    console.log(event.data);
    if (window.confirm('Tem certeza que deseja excluir o atendente ' + event.data.id + '?')) {
      this.atendenteService.DeleteAtendentes(event.data)
        .subscribe(() => {
        })
      event.confirm.resolve(event.data);
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.atendenteService.SelectAtendentes()
      .then((atendente: Atendente[]) => {
        this.source.load(atendente)
      })
  }
}
