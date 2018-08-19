import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public formLogin: FormGroup = new FormGroup({      
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(40)]),      
        'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])        
    })
    constructor(public router: Router) {}

    ngOnInit() {}

    public ValidarFormLogin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
