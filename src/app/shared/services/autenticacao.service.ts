import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Usuario } from '../models/usuario.model'
import { Injectable } from '@angular/core'

import { URL_API } from '../apis/api'
import 'rxjs/add/operator/map'


@Injectable()
export class AutenticacaoService {  
   
    constructor(private http: Http){}

    public RegistrarUsuario(usuario: Usuario) : void {              
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
         this.http.post(
            `${URL_API}/usuarios/`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)                    
    }
}