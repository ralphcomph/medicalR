import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Medico } from '../models/medico.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'

@Injectable()
export class MedicoService {   
    
    constructor(private http: Http){}
    
    public SelectMedicoAll(): Promise<Medico[]> {              
        return this.http.get(`${URL_API}/medico?isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public SelectMedicoByCRM(crm : string): Promise<Medico[]> {              
        return this.http.get(`${URL_API}/medico?crm=${crm}&isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public CreateMedico(medico: Medico): Observable<number> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL_API}/medico`,
            JSON.stringify(medico),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)
    }   
   
    public UpdateMedico(medico: Medico): Observable<number> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/medico/${medico.id}`,
            JSON.stringify(medico),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }     

    public DeleteMedico(medico: Medico): Observable<number> {       
        let headers: Headers = new Headers()
        medico.isdel = true;
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/medico/${medico.id}`,
            JSON.stringify(medico),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   
}