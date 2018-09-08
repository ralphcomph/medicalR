import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Remedio } from '../models/remedio.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'

@Injectable()
export class RemedioService {   
    
    constructor(private http: Http){}
    
    public SelectRemedioAll(): Promise<Remedio[]> {              
        return this.http.get(`${URL_API}/remedio?isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public SelectRemedioByNome(nome : string): Promise<Remedio[]> {              
        return this.http.get(`${URL_API}/remedio?nome=${nome}&isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public CreateRemedio(remedio: Remedio): Observable<number> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL_API}/remedio`,
            JSON.stringify(remedio),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)
    }   
   
    public UpdateRemedio(remedio: Remedio): Observable<number> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/remedio/${remedio.id}`,
            JSON.stringify(remedio),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   

    /*public DeleteRemedio(remedio: Remedio): Observable<null> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.delete(
            `${URL_API}/remedio/${remedio.id}`,           
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => null)       
    }*/  

    public DeleteRemedio(remedio: Remedio): Observable<number> {       
        let headers: Headers = new Headers()
        remedio.isdel = true;
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/remedio/${remedio.id}`,
            JSON.stringify(remedio),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   
}