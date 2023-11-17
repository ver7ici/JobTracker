import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { JobFormComponent } from './job-form/job-form.component';
import { HomeButtonComponent } from './home-button/home-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    CreateComponent,
    DeleteComponent,
    EditComponent,
    JobFormComponent,
    HomeButtonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
