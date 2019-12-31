import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Toy } from '../toy';

@Component({
  templateUrl: './toy-edit-tags.component.html'
})
export class ToyEditTagsComponent implements OnInit {
  errorMessage: string;
  newTags = '';
  toy: Toy;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.toy = data['resolvedData'].toy;
    });
  }

  // Add the defined tags
  addTags(): void {
    if (!this.newTags) {
      this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
    } else {
      const tagArray = this.newTags.split(',');
      this.toy.tags = this.toy.tags ? this.toy.tags.concat(tagArray) : tagArray;
      this.newTags = '';
      this.errorMessage = '';
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.toy.tags.splice(idx, 1);
  }
}
