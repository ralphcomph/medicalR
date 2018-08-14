import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'

import { Perfil } from '../models/perfil.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

@Injectable()
export class PerfilService {   
    
    constructor(private http: Http){}
    
    public SelectPerfil(): Promise<Perfil[]> {
        console.log("chegamos aqui")               
        return this.http.get(`${URL_API}/perfil?userdel=0`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public Teste(): void {
        console.log("chegamos aqui")  
    }
}