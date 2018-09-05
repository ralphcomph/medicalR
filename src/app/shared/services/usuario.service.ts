import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario.model'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class UsuarioService {
    firebaseUserList: AngularFireList<any>;    

    items: Observable<any[]>;
    constructor(
        private firebase: AngularFireDatabase
    ) { }

    public getData() {
        this.firebaseUserList = this.firebase.list('usuarios_info');
        return this.firebaseUserList;
    }   

    updateUsuario(usuario: Usuario) {
        this.firebaseUserList.update(usuario.id,
            {
                nome: usuario.nome,
                perfil: usuario.perfil,
                email: usuario.email,
                senha: usuario.senha
            });
    }

    deleteUsuario(id: string) {
        this.firebaseUserList.remove(id);
    }
}