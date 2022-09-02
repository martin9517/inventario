import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-marcas-form',
  templateUrl: './marcas-form.component.html',
  styleUrls: ['./marcas-form.component.css']
})
export class MarcasFormComponent implements OnInit {

  constructor(
    protected fb: FormBuilder,
    protected marcaService: MarcaService,
    protected router: Router,
    protected activedRoute: ActivatedRoute

  ) { }

  model: Marca = {};
  form: FormGroup;
  entityId: any;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: new FormControl(),
      codigo: new FormControl()
    });
    this.fechEntity();
  }

  fechEntity(): void {
    this.entityId = this.activedRoute.snapshot.params['id'];
    if (this.entityId) {
      this.marcaService.get(this.entityId).subscribe(data => {
        this.form.patchValue({
          ...data
        })
      })
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.entityId) {
        this.marcaService.update(this.entityId, this.form.value).subscribe(data => {
          this.router.navigate(['marcas']);
        });
      } else {
        this.marcaService.create(this.form.value).subscribe(data => {
          this.router.navigate(['marcas']);
        });
      }
    }
  }
}