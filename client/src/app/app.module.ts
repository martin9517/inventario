import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcasListComponent } from './components/marcas/marcas-list/marcas-list.component';
import { MarcasFormComponent } from './components/marcas/marcas-form/marcas-form.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from './components/productos/productos-form/productos-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MarcasListComponent,
    MarcasFormComponent,
    ProductosListComponent,
    ProductosFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
