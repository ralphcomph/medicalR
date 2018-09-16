import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'

import { Especialidade } from '../models/especialidade.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

@Injectable()
export class EspecialidadeService {   
    
    constructor(private http: Http){}
    
    public SelectEspecialidadeAll(): Promise<Especialidade[]> {                     
        return this.http.get(`${URL_API}/especialidade`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  
  
}