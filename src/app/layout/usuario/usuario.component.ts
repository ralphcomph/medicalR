import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
