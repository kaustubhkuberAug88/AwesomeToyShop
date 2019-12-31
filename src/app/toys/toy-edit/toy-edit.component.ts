import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';

import { Toy, ToyResolved } from '../toy';
import { ToyService } from '../toy.service';

@Component({
  templateUrl: './toy-edit.component.html',
  styleUrls: ['./toy-edit.component.css']
})
export class ToyEditComponent implements OnInit {
  pageTitle = 'Toy Edit';
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalToy) !== JSON.stringify(this.currentToy);
  }

  private currentToy: Toy;
  private originalToy: Toy;

  get toy(): Toy {
    return this.currentToy;
  }
  set toy(value: Toy) {
    this.currentToy = value;
    // Clone the object to retain a copy
    this.originalToy = { ...value };
  }

  constructor(private toyService: ToyService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: ToyResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onToyRetrieved(resolvedData.toy);
    });
  }

  onToyRetrieved(toy: Toy): void {
    this.toy = toy;

    if (!this.toy) {
      this.pageTitle = 'No toy found';
    } else {
      if (this.toy.id === 0) {
        this.pageTitle = 'Add Toy';
      } else {
        this.pageTitle = `Edit Toy: ${this.toy.toyName}`;
      }
    }
  }

  deleteToy(): void {
    if (this.toy.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.toy.toyName} was deleted`);
    } else {
      if (confirm(`Really delete the Toy: ${this.toy.toyName}?`)) {
        this.toyService.deleteToy(this.toy.id).subscribe({
          next: () => this.onSaveComplete(`${this.toy.toyName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentToy = null;
    this.originalToy = null;
  }

  saveToy(): void {
    if (this.isValid()) {
      if (this.toy.id === 0) {
        this.toyService.createToy(this.toy).subscribe({
          next: () => this.onSaveComplete(`The new ${this.toy.toyName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.toyService.updateToy(this.toy).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.toy.toyName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the toys list
    this.router.navigate(['/toys']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.toy.toyName &&
      this.toy.toyName.length >= 3 &&
      this.toy.toyCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.toy.category &&
      this.toy.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }

}
