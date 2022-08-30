import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BonificacionService } from 'src/app/services/bonificacion.service';
import { ProductosListComponent} from 'src/app/components/productos/productos-list/productos-list.component';
@Component({
  selector: 'app-bonificacion-form',
  templateUrl: './bonificacion-form.component.html',
  styleUrls: ['./bonificacion-form.component.css']
})
export class BonificacionFormComponent implements OnInit {
  
  password: string;
  validPassword = '123';
  isPasswordValidated: boolean;
  form: FormGroup;
  entityId: string;
  showPassword: boolean = false;
  
  constructor(
    protected fb: FormBuilder,
    public modal: NgbActiveModal,
    private bonificacionService: BonificacionService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      porcentaje: new FormControl(),
    });
    this.fetchBonificacion();
  }

  fetchBonificacion(): void {
    this.bonificacionService.getOne().subscribe(data => {
      if (data) {
        this.entityId = data.id;
        this.form.patchValue({
          ...data
        });
      }
    });
  }

  validarPassword(): void {
    if (this.password === this.validPassword) this.isPasswordValidated = true;
  }
  hidePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.entityId) {
        this.bonificacionService.update(this.entityId, this.form.value).subscribe(data => {
          this.modal.close(true);
        });
      } else {
        this.bonificacionService.create(this.form.value).subscribe(data => {
          this.modal.close(true);      
        });
      }
    }
  }

}
