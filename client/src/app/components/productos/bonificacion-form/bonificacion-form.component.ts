import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bonificacion-form',
  templateUrl: './bonificacion-form.component.html',
  styleUrls: ['./bonificacion-form.component.css']
})
export class BonificacionFormComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {


  }

}
