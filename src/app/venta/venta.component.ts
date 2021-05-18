import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiCdService } from '../services/api-cd.service';
import { ApiVentaService } from '../services/api-venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  crearVenta:Boolean= true;
  submitted:boolean = false;
  lstClientes:any;
  lstProductos:any;
  constructor(private formBuilder:FormBuilder,private apiVenta: ApiVentaService) { }

  formulario= this.formBuilder.group({
    CodigoVenta:['',Validators.required],
    FechaVenta:['',Validators.required],
    ClienteId:['',Validators.required],
    ProductoIds:['',Validators.required],
    ValorVenta:['',Validators.required],
    
    
  });

  ngOnInit(): void {
    this.getClientes();
    this.getProducto();
  }
  get f(){return  this.formulario.controls}
  
  resetFormulario(){
  this.formulario.reset();
  }

  getClientes(){
  this.apiVenta.GetCliente().subscribe(response =>{
    if(response.exito==1)
    {
     this.lstClientes = response.datos;
    }
   
  })
      
  
  }

  getProducto(){
    this.apiVenta.GetProducto().subscribe(response =>{
      if(response.exito==1)
      {
       this.lstProductos = response.datos;
       console.log(response.datos)
      }
     
    })
        
    
    }
}
