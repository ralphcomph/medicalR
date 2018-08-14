import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: UsuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ReactiveFormsModule]
})
export class UsuarioRoutingModule {
}
