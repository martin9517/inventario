import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/models/marca.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  constructor(
    protected fb: FormBuilder,
    protected productoService: ProductoService,
    protected marcaService: MarcaService,
    protected router: Router,
    protected activedRoute: ActivatedRoute,
  ) { }

  model: Producto = {};
  form: FormGroup;
  marcas: Marca[];
  entityId: any;

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: new FormControl(),
      nombre: new FormControl(),
      precioUnitario: new FormControl(),
      marca: new FormControl()
    });
    this.fechEntity();
    this.fetchMarcas();
  }

  fechEntity(): void {
   this.entityId = this.activedRoute.snapshot.params['id'];
    if (this.entityId) {
      this.productoService.get(this.entityId).subscribe(data => {
        this.form.patchValue({
          ...data
        })
      })
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.entityId) {
        this.productoService.update(this.entityId, this.form.value).subscribe(data => {
          this.router.navigate(['productos']);
        });
      } else {
        this.productoService.create(this.form.value).subscribe(data => {
          this.router.navigate(['productos']);
        });
      }
    }
  }

fetchMarcas(): void {
  this.marcaService.getAll().subscribe(data => {
    this.marcas = data
  })
}


}

