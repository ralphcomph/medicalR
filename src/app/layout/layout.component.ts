import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    
    public UsuarioLogado : string

    constructor() {}   
    
    ngOnInit() {
        let user = firebase.auth().currentUser;
        this.UsuarioLogado = user.email;            
    }
}
