import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CdComponent } from './cd/cd.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DataTablesModule } from "angular-datatables";
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { VentaComponent } from './venta/venta.component'; //importacion del modulo api


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CdComponent,
    ClientesComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // variable de importacion
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
