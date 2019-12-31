import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToyListComponent } from './toy-list.component';
import { ToyDetailComponent } from './toy-detail.component';
import { ToyEditComponent } from './toy-edit/toy-edit.component';
import { ToyEditInfoComponent } from './toy-edit/toy-edit-info.component';
import { ToyEditTagsComponent } from './toy-edit/toy-edit-tags.component';
import { ToyResolver } from './toy-resolver.service';

import { SharedModule } from '../shared/shared.module';
import { ToyEditGuard } from './toy-edit/toy-edit.guard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ToyListComponent
      },
      {
        path: ':id',
        component: ToyDetailComponent,
        resolve: { resolvedData: ToyResolver }
      },
      {
        path: ':id/edit',
        component: ToyEditComponent,
        canDeactivate: [ToyEditGuard],
        resolve: { resolvedData: ToyResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ToyEditInfoComponent },
          { path: 'tags', component: ToyEditTagsComponent }
        ]
      }
    ])
  ],
  declarations: [
    ToyListComponent,
    ToyDetailComponent,
    ToyEditComponent,
    ToyEditInfoComponent,
    ToyEditTagsComponent
  ]
})
export class ToyModule { }
