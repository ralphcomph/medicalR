import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from '../../shared';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [CommonModule, UsuarioRoutingModule, PageHeaderModule, Ng2SmartTableModule],
    declarations: [UsuarioComponent]
})
export class UsuarioModule {}
