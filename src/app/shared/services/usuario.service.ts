import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Usuario } from '../models/usuario.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
//import 'rxjs/add/operator/do'
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable()
export class UsuarioService {   
    
    constructor(private http: Http){}
    
    public SelectUsuarios(): Promise<Usuario[]> {              
        return this.http.get(`${URL_API}/usuarios?userdel=0`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  
    
    public CreateUsuarios(usuario: Usuario, userdel : number): Observable<number> {
        usuario.userdel = userdel; 
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL_API}/usuarios/`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   

    public UpdateUsuarios(usuario: Usuario, userdel : number): Observable<number> {
        usuario.userdel = userdel;
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/usuarios/${usuario.id}`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id )       
    }   

    public DeleteUsuarios(usuario: Usuario, userdel : number): Observable<null> {
        usuario.userdel = userdel;
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/usuarios/${usuario.id}`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => null )       
    }   

}