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
        return this.http.get(`${URL_API}/usuarios`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  
    
    public CreateUsuarios(usuario: Usuario): void {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
         this.http.post(
            `${URL_API}/usuarios/`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   

    public UpdateUsuarios(usuario: Usuario): Observable<number> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/usuarios/${usuario.id}`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id )       
    }   

    public DeleteUsuarios(usuario: Usuario): Observable<null> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.delete(
            `${URL_API}/usuarios/${usuario.id}`,           
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => null )       
    }   

}