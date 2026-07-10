import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ComponenteSemestreComponent } from './componente-semestre/componente-semestre.component';
import { ComponenteLoginComponent } from './componente-login/componente-login.component';

const routes: Routes = [
  { path: 'Login', component: ComponenteLoginComponent},
  { path:'Semestre',component: ComponenteSemestreComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
