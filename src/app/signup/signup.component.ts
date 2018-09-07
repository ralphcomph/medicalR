import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Usuario } from '../shared/models/usuario.model';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    private usuarioId: number;
    private msnerror: string;

    public formRegister: FormGroup = new FormGroup({
        'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(40)]),
        'perfil': new FormControl(null, [Validators.required]),
        'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
        'confirmasenha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    })

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    public RegistrarUsuario(): void {

        if (this.formRegister.value.senha !== this.formRegister.value.confirmasenha) {
            this.msnerror = "Senhas divergentes!";
        }
        else {
            if (this.formRegister.status === 'INVALID') {
                this.formRegister.get('nome').markAsTouched()
                this.formRegister.get('email').markAsTouched()
                this.formRegister.get('perfil').markAsTouched()
                this.formRegister.get('senha').markAsTouched()
                this.formRegister.get('confirmasenha').markAsTouched()

            } else {
                let usuario: Usuario = new Usuario(
                    null,
                    this.formRegister.value.perfil,
                    this.formRegister.value.nome,
                    this.formRegister.value.email,
                    this.formRegister.value.senha
                )

                firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
                    .then((resp: any) => {
                        firebase.database().ref(`usuarios_info/${btoa(usuario.email)}`)
                            .set(usuario)
                        this.formRegister.reset();
                        this.msnerror = undefined;
                        this.router.navigate(["/principal"]);
                    })
                    .catch((error: firebase.auth.Error) => {
                        switch (error.code) {
                            case "auth/email-already-in-use": {
                                this.msnerror = "O e-mail fornecido já está em uso por outro usuário!";
                                break;
                            }
                            default: {
                                this.msnerror = "Erro ao tentar registrar usuário!";
                                break;
                            }
                        }
                    })
            }
        }
    }
}
