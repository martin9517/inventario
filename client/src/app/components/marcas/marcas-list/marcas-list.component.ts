import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import readXlsxFile from 'read-excel-file';
import { Marca } from 'src/app/models/marca.model';
import { Pagination, QueryParams } from 'src/app/models/rest.model';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marcas-list',
  templateUrl: './marcas-list.component.html',
  styleUrls: ['./marcas-list.component.css']
})
export class MarcasListComponent implements OnInit {
  LIMIT = 10;
  marcas?: Marca[];
  editables = {};
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
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    this.fetchMarcas();
  }

  new(): void {
    this.router.navigate(['marcas', 'create']);
  }

  edit(id: string): void {
    this.router.navigate(['marcas', 'edit', id])
  }

  deleteEntity(id: string): void {
    this.marcaService.delete(id).subscribe(data => {
      this.fetchMarcas();
    })
  }

  fetchMarcas(): void {
    this.marcaService.getAll(this.queryParams) 
      .subscribe({
        next: (data) => {
          this.marcaService.count(this.queryParams).subscribe(count => {
            this.marcas = data;
            this.pagination.total = count.total;
          });
        },
        error: (e) => console.error(e)
      });
  }

  onChangePage(page: number): void {
    this.queryParams.skip = page * this.LIMIT;
    this.pagination.page = page;
    this.fetchMarcas();
  }


  onFileChange(data: any): void {
    const mapFile = {
      nombre: 'nombre',
      codigo: 'codigo'
    }
    const file = data.srcElement.files ? data.srcElement.files[0] : null;
    if (file) {
      readXlsxFile(file, { map: mapFile }).then((data) => {
        this.marcaService.import(data.rows).subscribe(data => {
          this.fetchMarcas();
        })
      })
    }
  }

}
