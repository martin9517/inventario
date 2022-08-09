import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marcas-form',
  templateUrl: './marcas-form.component.html',
  styleUrls: ['./marcas-form.component.css']
})
export class MarcasFormComponent implements OnInit {

  constructor(
    protected fb: FormBuilder,
    protected marcaService: MarcaService,
    protected router: Router
  ) { }

  model: Marca = {};
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: new FormControl(),
      codigo: new FormControl()
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.marcaService.create(this.form.value).subscribe(data => {
        this.router.navigate(['marcas']);
      });
    }
  }

}
