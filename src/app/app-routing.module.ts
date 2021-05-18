import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CdComponent } from './cd/cd.component';
import { ClientesComponent } from './clientes/clientes.component'
import { VentaComponent } from './venta/venta.component'

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },{path:'home', component: HomeComponent},{path:'cd', component: CdComponent},{path:'clientes', component: ClientesComponent},{path:'venta', component: VentaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }