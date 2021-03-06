import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'principal' },
            { path: 'principal', loadChildren: './principal/principal.module#PrincipalModule' },  
            { path: 'usuarios', loadChildren: './usuario/usuario.module#UsuarioModule' },
            { path: 'atendentes', loadChildren: './atendente/atendente.module#AtendenteModule' },
            { path: 'pacientes', loadChildren: './paciente/paciente.module#PacienteModule' },
            { path: 'medicos', loadChildren: './medico/medico.module#MedicoModule' },
            { path: 'remedios', loadChildren: './remedio/remedio.module#RemedioModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },           
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
