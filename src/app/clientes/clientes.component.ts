import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ApiClienteService } from '../services/api-cliente.service';
import { Cliente } from '../models/cliente';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  lstCliente:any;
  dtOptions: DataTables.Settings = {};
cliente:Cliente = {} as Cliente ;
crearCliente:Boolean= false;
btneditar:Boolean = false;

constructor(private formBuilder:FormBuilder, private apiCliente:ApiClienteService) { }
formulario= this.formBuilder.group({
  Nombre:['',Validators.required],
  Direccion:['',Validators.required],
  Telefono:['',Validators.required],
  Email:['',Validators.required],
  FechaNacimineto:['',Validators.required],
  FechaInscripcion:['',Validators.required],
  TemaInteres:['',Validators.required],
  Estado:['',Validators.required],
  NroDNI:['',Validators.required]
  
});
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetCliente();
  }

  GetCliente(){
    this.apiCliente.GetCliente().subscribe(response =>{
    this.lstCliente = response.datos;
    })
  }

  AddCliente(){
    console.log(this.formulario.value)
    //Asignar valores del formulario a la variable cliente
    this.cliente = Object.assign(this.cliente, this.formulario.value);
    console.log(this.cliente)
    //
    this.apiCliente.addCliente(this.cliente).subscribe(response =>{
    if(response.exito==0){
      console.log(response.mensaje);
      return;
    }
    alert(response.exito);
    this.GetCliente();

    } )
  }

  editCliente(oCliente:Cliente){
    this.formulario.controls.Nombre.setValue(oCliente.nombre)
    this.formulario.controls.Direccion.setValue(oCliente.direccion)
    this.formulario.controls.Telefono.setValue(oCliente.telefono)
    this.formulario.controls.Email.setValue(oCliente.email)
    this.formulario.controls.FechaNacimineto.setValue(oCliente.fechaNacimineto)
    this.formulario.controls.FechaInscripcion.setValue(oCliente.fechaInscripcion)
    this.formulario.controls.TemaInteres.setValue(oCliente.temaInteres)
    this.formulario.controls.Estado.setValue(oCliente.estado)
    this.formulario.controls.NroDNI.setValue(oCliente.nroDNI)
    this.crearCliente = true;
    this.cliente.id=  oCliente.id;
  }

  updateCliente(){
    this.cliente = Object.assign(this.cliente, this.formulario.value);
    this.apiCliente.updateCliente(this.cliente).subscribe(response =>{
      if(response.exito==0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito);
      this.GetCliente();

    })
  }

}
