import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    protected marcaService:MarcaService,

    protected router: Router
  ) { }

  model: Producto = {};
  form: FormGroup;
  marcas: Marca [];

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: new FormControl(),
      nombre: new FormControl(),
      precioUnitario: new FormControl(),
      marca: new FormControl()
    });
    this.fetchMarcas();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.productoService.create(this.form.value).subscribe(data => {
        this.router.navigate(['productos']);
      });
    }
  }
  
  fetchMarcas():void{
    this.marcaService.getAll().subscribe(data => {
      this.marcas = data
    })
  }


}

