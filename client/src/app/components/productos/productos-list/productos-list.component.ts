import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Pagination, QueryParams } from 'src/app/models/rest.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {
  productos?: Producto[];
  search ='';
  pagination: Pagination = {
    page: 0,
    total: 0
  };
  queryParams: QueryParams = {
    limit: 10,
    skip: 0
  };
  paginateArray: Array<number>;

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
    this.productoService.getAll(this.queryParams)
      .subscribe({
        next: (data) => {
          this.productoService.count(this.queryParams).subscribe(count => {
            this.productos = data;
            this.pagination.total = count.total;
            this.paginateArray = Array.from(Array(Math.ceil(50/10)).keys());
          })
        }
      })
  }
  
  searchNombre(): void {
    if (this.search) {
      this.queryParams.filters = [{field: 'search', value: this.search}];
      this.fetchProducto();
    }
  }

  clearSearch(): void {
    if (!this.search) {
      this.queryParams.filters = [];
      this.fetchProducto();
    }
  }

}
