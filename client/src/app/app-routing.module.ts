import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasFormComponent } from './components/marcas/marcas-form/marcas-form.component';
import { MarcasListComponent } from './components/marcas/marcas-list/marcas-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'marcas', component: MarcasListComponent },
  { path: 'marcas/create', component: MarcasFormComponent },
  { path: 'marcas/edit/:id', component: MarcasFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }