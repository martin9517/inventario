import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() currentPage: number;
  @Input() perPage: number;
  @Input() total: number;
  @Output() readonly changePage: EventEmitter<number> = new EventEmitter();

  pagesArray: Array<number>;

  constructor() { }

  ngOnInit(): void {
    if (this.total && this.perPage) {
      this.pagesArray = Array.from(Array(Math.ceil(this.total / this.perPage)).keys());
    }
  }

  onChangePage(page: number): void {
    if (page !== this.currentPage) this.changePage.emit(page);
  }

}
