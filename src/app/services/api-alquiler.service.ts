import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Respuesta } from '../models/respuesta';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiAlquilerService {

  url:string = environment.baseUrl

  constructor(private _http: HttpClient) { }

  GetCliente():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url+"Alquiler/Clientes")
  }

}
