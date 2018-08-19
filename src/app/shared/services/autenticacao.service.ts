import { Usuario } from '../models/usuario.model'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export class AutenticacaoService {

    private msnerror: string = "OK"

    public RegistrarUsuario(usuario: Usuario): string {

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp: any) => {
                delete usuario.senha
                firebase.database().ref(`usuarios_info/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: firebase.auth.Error) => {
                switch (error.code) {
                    case "auth/email-already-in-use": {
                        this.msnerror = "O e-mail fornecido já está em uso por outro usuário!"
                        break;
                    }
                    default: {
                        this.msnerror = "Erro ao tentar registrar usuário!"
                        break;
                    }
                }
            })
        return this.msnerror;
    }
}