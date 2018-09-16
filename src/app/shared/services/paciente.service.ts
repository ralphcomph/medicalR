import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Paciente } from '../models/paciente.model'
import { URL_API } from '../apis/api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'

@Injectable()
export class PacienteService {   
    
    constructor(private http: Http){}
    
    public SelectPacienteAll(): Promise<Paciente[]> {              
        return this.http.get(`${URL_API}/paciente?isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public SelectPacienteByCPF(cpf: string): Promise<Paciente[]> {              
        return this.http.get(`${URL_API}/paciente?cpf=${cpf}&isdel=false`)
            .toPromise()
            .then((resp: Response) => resp.json())             
    }  

    public CreatePaciente(paciente: Paciente): Observable<number> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.post(
            `${URL_API}/paciente`,
            JSON.stringify(paciente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)
    }   
   
    public UpdatePaciente(paciente: Paciente): Observable<number> {       
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/paciente/${paciente.id}`,
            JSON.stringify(paciente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }     

    public DeletePaciente(paciente: Paciente): Observable<number> {       
        let headers: Headers = new Headers()
        paciente.isdel = true;
        headers.append('Content-type', 'application/json')
        return this.http.put(
            `${URL_API}/paciente/${paciente.id}`,
            JSON.stringify(paciente),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json().id)       
    }   
}