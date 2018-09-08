import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Atendente } from '../models/atendente.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
//import 'rxjs/add/operator/do'
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable()
export class AtendenteService {   
    
    constructor(private http: Http){}
    
    public SelectAtendenteAll(): Promise<Atendente[]> {              
        return this.http.get(`${URL_API}/atendente?isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public SelectAtendenteByCTPS(ctps : string): Promise<Atendente[]> {              
        return this.http.get(`${URL_API}/atendente?ctps=${ctps}&isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public CreateAtendente(atendente: Atendente): Observable<number> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL_API}/atendente`,
            JSON.stringify(atendente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)
    }   
   
    public UpdateAtendente(atendente: Atendente): Observable<number> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/atendente/${atendente.id}`,
            JSON.stringify(atendente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }     

    public DeleteAtendente(atendente: Atendente): Observable<number> {       
        let headers: Headers = new Headers()
        atendente.isdel = true;
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/atendente/${atendente.id}`,
            JSON.stringify(atendente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   
}