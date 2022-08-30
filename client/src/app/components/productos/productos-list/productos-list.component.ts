import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/producto.model';
import { Pagination, QueryParams } from 'src/app/models/rest.model';
import { ProductoService } from 'src/app/services/producto.service';
import { BonificacionFormComponent } from '../bonificacion-form/bonificacion-form.component';
import readXlsxFile from 'read-excel-file';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {
  LIMIT = 2;
  productos?: Producto[];
  search ='';
  pagination: Pagination = {
    page: 0,
    total: 0
  };
  queryParams: QueryParams = {
    limit: this.LIMIT,
    skip: 0
  };
  loading: boolean;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fetchProductos();
  }

  new(): void {
    this.router.navigate(['productos', 'create']);
  }

  edit(id:string):void{
    this.router.navigate(['productos', 'edit', id])
  }

  deleteEntity(id:string):void{
    this.productoService.delete(id).subscribe(data => {
      this.fetchProductos();
    })
  }

  fetchProductos(): void {
    this.loading = true;
    this.productoService.getAll(this.queryParams)
      .subscribe({
        next: (data) => {
          this.productoService.count(this.queryParams).subscribe(count => {
            this.productos = data;
            this.pagination.total = count.total;
            this.loading = false;
          });
        }
      })
  }
  
  searchNombre(): void {
    if (this.search) {
      this.queryParams.filters = [{field: 'search', value: this.search}];
      this.fetchProductos();
    }
  }

  clearSearch(): void {
    if (!this.search) {
      this.queryParams.filters = [];
      this.fetchProductos();
    }
  }

  onChangePage(page: number): void {
    this.queryParams.skip = page * this.LIMIT;
    this.pagination.page = page;
    this.fetchProductos();
  }
  
  openBonificacion(): void {
    const modal = this._modalService.open(BonificacionFormComponent);
    modal.result.then(data => {
      if (data) {
        this.fetchProductos();
      }
    })
  }

  onFileChange(data: any): void {
    const mapFile = {
      nombre: 'nombre',
      codigo: 'codigo',
      marca: 'marca',
      precio: 'precioUnitario',
      talle: 'talle'
    }
    const file = data.srcElement.files ? data.srcElement.files[0] : null;
    if (file) {
      readXlsxFile(file, {map: mapFile}).then((data) => {
        this.productoService.import(data.rows).subscribe(data => {
          this.fetchProductos();
        })
      })
    }
  }

}
