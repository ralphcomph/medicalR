import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendenteComponent } from './atendente.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: AtendenteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ReactiveFormsModule]
})
export class AtendenteRoutingModule {
}
