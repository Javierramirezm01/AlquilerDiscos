import { Injectable } from '@angular/core';
//cabezera de peticiones nuestro archivo json
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';
import { Cliente } from '../models/cliente';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {

 url:string = environment.baseUrl

  constructor(private _http: HttpClient) { }
  
 //Creacion del metodo consultar cliente e ir a la url   que esta en environment 
  GetCliente():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url+"Cliente")
  }
  //Creacion del metodo agregar cliente e ir a la url   que esta en environment 
  addCliente(cliente:Cliente):Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url+"Cliente",cliente,httpOption)
  }
  //Creacion del metodo actualizar cliente e  ir a la url   que esta en environment
  updateCliente(cliente:Cliente):Observable<Respuesta>{
    return this._http.put<Respuesta>(this.url+"Cliente",cliente,httpOption)
  }

  //Creacion del metodo desactivar cliente
  desactivarCliente(id: any):Observable<Respuesta>{
    return this._http.delete<Respuesta>(this.url+"Cliente/"+id)
  }

}

