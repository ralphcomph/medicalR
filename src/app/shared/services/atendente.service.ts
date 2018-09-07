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
    
    public SelectAtendentes(): Promise<Atendente[]> {              
        return this.http.get(`${URL_API}/atendentes`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public SelectAtendenteByCTPS(ctps : string): Promise<Atendente[]> {              
        return this.http.get(`${URL_API}/atendentes?ctps=${ctps}`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public CreateAtendente(atendente: Atendente): Observable<string> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL_API}/atendentes`,
            JSON.stringify(atendente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().ctps )
    }   
   
    public UpdateAtendente(atendente: Atendente): Observable<string> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/atendentes/${atendente.ctps}`,
            JSON.stringify(atendente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id )       
    }   

    public DeleteAtendente(atendente: Atendente): Observable<null> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.delete(
            `${URL_API}/atendentes/${atendente.id}`,           
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => null )       
    }   

}