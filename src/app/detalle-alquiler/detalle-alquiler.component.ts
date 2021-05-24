import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiCdService } from '../services/api-cd.service';
import { ApiAlquilerService } from '../services/api-alquiler.service';
import { ApiDetalleAlquilerService } from '../services/api-detalle-alquiler.service';
import { DetalleAlquiler } from '../models/detalle-alquiler';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css']
})

export class DetalleAlquilerComponent implements OnInit {

  crearDetalleAlquiler:Boolean= true;
  submitted:boolean = false;
  lstCd: any;
  lstAlquiler: any;
  
 

  constructor(private formBuilder:FormBuilder,private apiDetalleAlquiler: ApiDetalleAlquilerService) {}

  formulario= this.formBuilder.group({
    item:['',Validators.required],
    diasPrestamo:['',Validators.required],
    fechaDevolucion:['',Validators.required],
    CdId:['',Validators.required],
    AlquilerId:['',Validators.required]
    
    
  });

  ngOnInit(): void {
    this.getCd();
    this.getAlquiler();
   
    
  }
  
  get f(){return  this.formulario.controls}
  
resetFormulario(){
this.formulario.reset();

}

getCd(){
  this.apiDetalleAlquiler.GetCd().subscribe(response =>{
    if(response.exito==1)
    {
     this.lstCd = response.datos;
    }
  })
      
  
  }
  
  getAlquiler(){
    this.apiDetalleAlquiler.GetAlquiler().subscribe(response =>{
      if(response.exito==1)
      {
       this.lstAlquiler = response.datos;
      }
    })
        
    
    }
    
}
