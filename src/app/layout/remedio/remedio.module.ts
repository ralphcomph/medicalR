import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemedioRoutingModule } from './remedio-routing.module';
import { RemedioComponent } from './remedio.component';
import { PageHeaderModule } from '../../shared';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [CommonModule, RemedioRoutingModule, PageHeaderModule, Ng2SmartTableModule],
    declarations: [RemedioComponent]
})
export class RemedioModule {}
