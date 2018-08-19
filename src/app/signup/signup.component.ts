import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { AutenticacaoService } from '../shared/services/autenticacao.service'
import { Usuario } from '../shared/models/usuario.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [AutenticacaoService],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    
    private usuarioId: number   

    public formRegister: FormGroup = new FormGroup({
        'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(40)]),
        'perfil': new FormControl(null, [Validators.required]),
        'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
        'confirmasenha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])        
    })

    constructor(
        private autenticacaoService: AutenticacaoService  
    ) { }  

    ngOnInit() { }

    public RegistrarUsuario(): void {
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

           let feedbackmessage = this.autenticacaoService.RegistrarUsuario(usuario);  
           console.log("feedbackmessage",feedbackmessage);

           if(feedbackmessage !== "OK")
           {
            //console.log(feedbackmessage)
           }
           else
           {
            this.formRegister.reset();  
           }
                  
        }
    }
}
