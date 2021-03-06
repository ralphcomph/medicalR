import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'

import { Perfil } from '../models/perfil.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class PerfilService {   
    
    constructor(private http: Http){}
    
    public SelectPerfilAll(): Promise<Perfil[]> {                     
        return this.http.get(`${URL_API}/perfil`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  
  
}