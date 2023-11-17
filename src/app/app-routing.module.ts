import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'delete/:id',
    component: DeleteComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }