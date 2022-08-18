import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {
  productos?: Producto[];

  constructor(
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.fetchProducto();
  }

  new(): void {
    this.router.navigate(['productos', 'create']);
  }

  edit(id:string):void{
    this.router.navigate(['productos', 'edit', id])
  }

  deleteEntity(id:string):void{
    this.productoService.delete(id).subscribe(data => {
      this.fetchProducto();
    })
  }

  fetchProducto(): void {
    this.productoService.getAll()
      .subscribe({
        next: (data) => {
          this.productos = data;
        }
      })
  }

}
