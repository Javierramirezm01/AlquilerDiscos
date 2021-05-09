import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ApiClienteService } from '../services/api-cliente.service';
import { Cliente } from '../models/cliente';
import Swal from 'sweetalert2';

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
submitted:boolean = false;
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

  //esta sentencia sirve para ponerle un alias al formulario.
  get f(){return  this.formulario.controls}
  
resetFormulario(){
this.formulario.reset();

}

  mostrarClientes(){
    this.btneditar=false;
    this.crearCliente=true;
    this.resetFormulario();
  }

    GetCliente(){
    this.apiCliente.GetCliente().subscribe(response =>{
    this.lstCliente = response.datos;
    })
  }

  AddCliente(){
    this.submitted = true;
    if(this.formulario.invalid){
      return;
    }

    Swal.fire({
      title: 'Cliente',
      text: '¿Desea guardar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        this.cliente = Object.assign(this.cliente, this.formulario.value);
        console.log(this.cliente)
        
        this.apiCliente.addCliente(this.cliente).subscribe(response =>{
        if(response.exito==0){
          console.log(response.mensaje);
          return;
        }
       
        Swal.fire({
          title: 'Cliente',
          text: 'El cliente se guardo con exito',
          icon: 'success',
          showCancelButton: false,
        })
        
        this.GetCliente();
    
        } )
    
  
     
    
      }
    })
       
    //Asignar valores del formulario a la variable cliente
    
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
    this.btneditar=true;
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

  desactivarCliente(cliente: Cliente){
    this.apiCliente.desactivarCliente(cliente.id).subscribe(response =>{
     if(response.exito==0){
      console.log(response.mensaje);
      return;
    }
    alert(response.exito);
    this.GetCliente();
})

  }

}
