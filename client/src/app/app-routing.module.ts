import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasFormComponent } from './components/marcas/marcas-form/marcas-form.component';
import { MarcasListComponent } from './components/marcas/marcas-list/marcas-list.component';
import { ProductosFormComponent } from './components/productos/productos-form/productos-form.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'marcas', component: MarcasListComponent },
  { path: 'marcas/create', component: MarcasFormComponent },
  { path: 'marcas/edit/:id', component: MarcasFormComponent },
  { path: 'productos', component: ProductosListComponent },
  { path: 'productos/create', component: ProductosFormComponent },
  { path: 'productos/edit/:id', component: ProductosFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }