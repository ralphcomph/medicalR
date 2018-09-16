import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicoComponent } from './medico.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: MedicoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ReactiveFormsModule]
})
export class MedicoRoutingModule {
}
