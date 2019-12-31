import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Toy, ToyResolved } from './toy';

@Component({
  templateUrl: './toy-detail.component.html',
  styleUrls: ['./toy-detail.component.css']
})
export class ToyDetailComponent implements OnInit {
  pageTitle = 'Toy Detail';
  toy: Toy;
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: ToyResolved =
      this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onToyRetrieved(resolvedData.toy);
  }

  onToyRetrieved(toy: Toy): void {
    this.toy = toy;

    if (this.toy) {
      this.pageTitle = `Toy Detail: ${this.toy.toyName}`;
    } else {
      this.pageTitle = 'No Toy found';
    }
  }
}
