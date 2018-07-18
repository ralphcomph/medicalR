import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, UsuarioRoutingModule, PageHeaderModule],
    declarations: [UsuarioComponent]
})
export class UsuarioModule {}
