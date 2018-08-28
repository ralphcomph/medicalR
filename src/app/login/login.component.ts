import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import * as firebase from 'firebase/app'
import 'firebase/auth'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    private msnerror: string

    public formLogin: FormGroup = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(40)]),
        'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })
    constructor(public router: Router) { }

    ngOnInit() { }

    public Logar() {

        if (this.formLogin.status === 'INVALID') {
            this.formLogin.get('email').markAsTouched()
            this.formLogin.get('senha').markAsTouched()
        }
        else {                      
            firebase.auth().signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.senha)           
            .then((resp: any) => {                           
                    this.formLogin.reset();
                    this.msnerror = undefined;
                    this.router.navigate(["/principal"]);
                })
                .catch((error: firebase.auth.Error) => {                   
                    switch (error.code) {                      
                        case "auth/wrong-password": {
                            this.msnerror = "Usuário e/ou Senha inválida!";
                            break;
                        }
                        case "auth/user-disabled": {
                            this.msnerror = "Usuário desativado!";
                            break;
                        }
                        default: {
                            this.msnerror = "Erro ao tentar registrar usuário!";
                            break;
                        }
                    }
                })

            localStorage.setItem('isLoggedin', 'true');
        }      
    }
}
