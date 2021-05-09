import { Injectable } from '@angular/core';
//cabezera de peticiones nuestro archivo json
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';
import { Cd } from '../models/cd';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiCdService {

 url:string = environment.baseUrl

  constructor(private _http: HttpClient) { }
  
 //Creacion del metodo consultar cd e ir a la url   que esta en environment 
  GetCd():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url+"Cd")
  }
  //Creacion del metodo agregar cd e ir a la url   que esta en environment 
  addCd(cd:Cd):Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url+"Cd",cd,httpOption)
  }
  //Creacion del metodo actualizar cd e  ir a la url   que esta en environment
  updateCd(cd:Cd):Observable<Respuesta>{
    return this._http.put<Respuesta>(this.url+"Cd",cd,httpOption)
  }

  //Creacion del metodo desactivar cd
  desactivarCd(id: any):Observable<Respuesta>{
    return this._http.delete<Respuesta>(this.url+"Cd/"+id)
  }

}

