import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: PacienteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ReactiveFormsModule]
})
export class PacienteRoutingModule {
}
