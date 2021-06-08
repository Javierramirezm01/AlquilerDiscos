import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiCdService } from '../services/api-cd.service';
import { ApiAlquilerService } from '../services/api-alquiler.service';
import { Alquiler } from '../models/alquiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
  
})
export class AlquilerComponent implements OnInit {

  crearAlquiler:Boolean= false;
  submitted:boolean = false;
  lstClientes: any;
  lstAlquiler: any;
  lstProductos:any;
  fechaActual:any;
  alquiler: Alquiler={} as Alquiler;
  dtOptions: DataTables.Settings = {};
  detallesAlquiler: any;
  mostrarDetalle: boolean = false; 
  codigo_Alquiler :number;
  sancion:boolean =false;

  
  constructor(private formBuilder:FormBuilder,private apiAlquiler: ApiAlquilerService) { }

  formulario= this.formBuilder.group({
    nroAlquiler:['',Validators.required],
    fechaAlquiler:['',Validators.required],
    ProductoIds:['',Validators.required],
    ValorAlquiler:['',Validators.required],
    ClienteId:['',Validators.required]
       
  });

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.fechaActual = new Date().toISOString();
    this.getClientes();
    this.getAlquiler();
    this.getProducto();
    }

  get f(){return  this.formulario.controls}
  
resetFormulario(){
this.formulario.reset();

}

getProducto(){
  this.apiAlquiler.GetProducto().subscribe(response =>{
    if(response.exito==1)
    {
     this.lstProductos = response.datos;
     console.log(response.datos)
    }
   
  })
     
}

getAlquiler(){
  this.apiAlquiler.GetAlquiler().subscribe(response =>{
    if(response.exito==1)
    {
     this.lstAlquiler = response.datos;
     console.log(this.lstAlquiler);
    }
  })
}

getClientes(){
  this.apiAlquiler.GetCliente().subscribe(response =>{
    if(response.exito==1)
    {
     this.lstClientes = response.datos;
    }
  })
      
  
  }

  AddAlquiler(){
    this.submitted = true;
    if(this.formulario.invalid){
      return;
    }

    Swal.fire({
      title: 'Alquiler',
      text: '¿Desea guardar el Alquiler?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        this.alquiler = Object.assign(this.alquiler, this.formulario.value);
        console.log(this.alquiler);
        this.apiAlquiler.AddAlquiler(this.alquiler).subscribe(response =>{
        if(response.exito==0){
          console.log(response.mensaje);
          return;
        }
       
        Swal.fire({
          title: 'Venta',
          text: 'La venta se guardo con exito',
          icon: 'success',
          showCancelButton: false,
        })
    
        } )
    
      }
    })
       
    //Asignar valores del formulario a la variable venta
    
  }

  detalleAlquiler(detalle, codigo){
    this.detallesAlquiler = detalle;
    this.codigo_Alquiler= codigo;
    this.mostrarDetalle= true;
    console.log(detalle);
  }

  // sancionar(nroAlquiler, nombre){
  //   //this.apiAlquiler.metodoSancionar(nroAlquiler,nombre);
  // }

}
