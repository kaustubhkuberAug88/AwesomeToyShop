import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Toy } from './toy';
import { ToyService } from './toy.service';

@Component({
  templateUrl: './toy-list.component.html',
  styleUrls: ['./toy-list.component.css']
})
export class ToyListComponent implements OnInit {
  pageTitle = 'Toys List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredToys = this.listFilter ? this.performFilter(this.listFilter) : this.toys;
  }

  filteredToys: Toy[] = [];
  toys: Toy[] = [];

  constructor(private toyService: ToyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.toyService.getToys().subscribe({
      next: toys => {
        this.toys = toys;
        this.filteredToys = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Toy[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.toys.filter((toy: Toy) =>
    toy.toyName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
