import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { MedicoComponent } from './medico.component';
import { PageHeaderModule } from '../../shared';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [CommonModule, MedicoRoutingModule, PageHeaderModule, Ng2SmartTableModule],
    declarations: [MedicoComponent]
})
export class MedicoModule {}
