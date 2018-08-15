import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms'

//import { UsuarioService } from '../shared/services/usuario.service'
//import { Usuario } from '../shared/models/usuario.model'
//import { PerfilService } from '../shared/services/perfil.service'
//import { Perfil } from '../shared/models/perfil.model'

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

    public formLogin: FormGroup = new FormGroup({
        'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(40)]),
        'perfil': new FormControl(null, [Validators.required]),
        'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
        'confirmasenha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])        
    })

    constructor(
        private autenticacaoService: AutenticacaoService
        //private usuarioService: UsuarioService,
        //private perfilService: PerfilService
               
    ) { }  

    ngOnInit() {    

        //this.perfilService.SelectPerfil()
        //.then((perfil: Perfil[]) => {
        // console.log(perfil)  
        //})  
        
        //this.usuarioService.SelectUsuarios()
        //.then((usuario: Usuario[]) => {
        // console.log(usuario)  
        //}) 
    }

    public validaUsuario(): void {
        if (this.formLogin.status === 'INVALID') {
            console.log('formulário está inválido')

            this.formLogin.get('nome').markAsTouched()
            this.formLogin.get('email').markAsTouched()
            this.formLogin.get('perfil').markAsTouched()
            this.formLogin.get('senha').markAsTouched()
            this.formLogin.get('confirmasenha').markAsTouched()

        } else {          

            let usuario: Usuario = new Usuario(
                null,
                this.formLogin.value.perfil,
                this.formLogin.value.nome,
                this.formLogin.value.email,
                this.formLogin.value.senha
            )

            this.autenticacaoService.RegistrarUsuario(usuario);


           /* this.usuarioService.CreateUsuarios(usuario, 0)
                .subscribe((id: number) => {
                    this.usuarioId = id
                }) */
        }
    }
}
