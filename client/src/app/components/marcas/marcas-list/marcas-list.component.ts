import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marcas-list',
  templateUrl: './marcas-list.component.html',
  styleUrls: ['./marcas-list.component.css']
})
export class MarcasListComponent implements OnInit {

  marcas?: Marca[];
  editables = {};

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

  edit(id:string):void{
    this.router.navigate(['marcas', 'edit', id])
  }

  deleteEntity(id:string):void{
    this.marcaService.delete(id).subscribe(data => {
      this.fetchMarcas();
    })
  }

  fetchMarcas(): void {
    this.marcaService.getAll()
      .subscribe({
        next: (data) => {
          this.marcas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
