import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Toy } from '../toy';

@Component({
  templateUrl: './toy-edit-info.component.html'
})
export class ToyEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) toyForm: NgForm;

  errorMessage: string;
  toy: Toy;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      if (this.toyForm) {
        this.toyForm.reset();
      }

      this.toy = data['resolvedData'].toy;
    });
  }

}
