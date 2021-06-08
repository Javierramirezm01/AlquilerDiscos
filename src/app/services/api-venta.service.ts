import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';
import { Venta } from '../models/Venta';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiVentaService {

  url:string = environment.baseUrl

  constructor(private _http: HttpClient) { }

  
  GetCliente():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url+"Venta/Clientes")
  }

  GetProducto():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url+"Venta/productos")
  }

  AddVenta(venta: Venta):Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url+"Venta",venta, httpOption);
  }

  GetVenta():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url+"Venta")
  }
}
