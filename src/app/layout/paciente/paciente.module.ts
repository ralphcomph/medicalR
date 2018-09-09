import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { PageHeaderModule } from '../../shared';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [CommonModule, PacienteRoutingModule, PageHeaderModule, Ng2SmartTableModule],
    declarations: [PacienteComponent]
})
export class PacienteModule {}
