import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemedioComponent } from './remedio.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: RemedioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ReactiveFormsModule]
})
export class RemedioRoutingModule {
}
