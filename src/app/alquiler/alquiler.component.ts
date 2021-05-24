import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiDetalleAlquilerService } from '../services/api-detalle-alquiler.service';
import { ApiCdService } from '../services/api-cd.service';
import { ApiAlquilerService } from '../services/api-alquiler.service';
import { Alquiler } from '../models/alquiler';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
  
})
export class AlquilerComponent implements OnInit {

  crearAlquiler:Boolean= true;
  submitted:boolean = false;
  lstClientes: any;
  
  constructor(private formBuilder:FormBuilder,private apiAlquiler: ApiAlquilerService) { }

  formulario= this.formBuilder.group({
    nroAlquiler:['',Validators.required],
    fechaAlquiler:['',Validators.required],
    ValorAlquiler:['',Validators.required],
    ClienteId:['',Validators.required]
       
  });

  ngOnInit(): void {
    this.getClientes();
    }

  get f(){return  this.formulario.controls}
  
resetFormulario(){
this.formulario.reset();

}

getClientes(){
  this.apiAlquiler.GetCliente().subscribe(response =>{
    if(response.exito==1)
    {
     this.lstClientes = response.datos;
    }
  })
      
  
  }
}
