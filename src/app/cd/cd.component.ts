import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { ApiCdService } from '../services/api-cd.service';
import { Cd } from '../models/cd';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cds',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.css']
})
export class CdComponent implements OnInit {
  lstCd: any;
  dtOptions: DataTables.Settings = {};
  cd:Cd = {} as Cd ;
  crearCd:Boolean= false;
  submitted:boolean = false;
  btneditarCd:Boolean = false;
 
  constructor(private formBuilder:FormBuilder, private apiCd:ApiCdService) { }
  formulario= this.formBuilder.group({
    codigoTitulo:['',Validators.required],
    condicion:['',Validators.required],
    estado:['',Validators.required],
    ubicacion:['',Validators.required]
    
      
  });
  ngOnInit(): void {
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetCd();
  }

  //esta sentencia sirve para ponerle un alias al formulario.
  get f(){return  this.formulario.controls}
  
  resetFormulario(){
    this.formulario.reset();

  }

  mostrarCds(){
    this.btneditarCd=false;
    this.crearCd=true;
    this.resetFormulario();
  }

  GetCd(){
    this.apiCd.GetCd().subscribe(response =>{
    this.lstCd = response.datos;
    })
  }

  AddCd(){
    this.submitted = true;
    if(this.formulario.invalid){
      return;
    }

    Swal.fire({
      title: 'Cd',
      text: '¿Desea guardar el cd?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        this.cd = Object.assign(this.cd, this.formulario.value);
        console.log(this.cd)
        
        this.apiCd.addCd(this.cd).subscribe(response =>{
        if(response.exito==0){
          console.log(response.mensaje);
          return;
        }
       
        Swal.fire({
          title: 'Cd',
          text: 'El cd se guardo con exito',
          icon: 'success',
          showCancelButton: false,
        })
        
        this.GetCd();
    
        } )
    
  
     
    
      }
    })
       
    //Asignar valores del formulario a la variable cd
    
  }

  editCd(oCd:Cd){
    this.formulario.controls.codigoTitulo.setValue(oCd.codigoTitulo)
    this.formulario.controls.condicion.setValue(oCd.condicion)
    this.formulario.controls.estado.setValue(oCd.estado)
    this.formulario.controls.ubicacion.setValue(oCd.ubicacion)
    this.crearCd = true;
    this.cd.id=  oCd.id;
    this.btneditarCd=true;
  }

  updateCd(){
    this.cd = Object.assign(this.cd, this.formulario.value);
    this.apiCd.updateCd(this.cd).subscribe(response =>{
      if(response.exito==0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito);
      this.GetCd();

    })
  }

  desactivarCd(cd: Cd){
  this.apiCd.desactivarCd(cd.id).subscribe(response =>{
  if(response.exito==0){
    console.log(response.mensaje);
    return;
  }
  alert(response.exito);
  this.GetCd();
})

  }

}
