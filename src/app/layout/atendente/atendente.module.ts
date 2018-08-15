import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendenteRoutingModule } from './atendente-routing.module';
import { AtendenteComponent } from './atendente.component';
import { PageHeaderModule } from '../../shared';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [CommonModule, AtendenteRoutingModule, PageHeaderModule, Ng2SmartTableModule],
    declarations: [AtendenteComponent]
})
export class AtendenteModule {}
