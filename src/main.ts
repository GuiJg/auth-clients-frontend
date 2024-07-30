import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './app/home/home.component';
import { DataFormComponent } from './app/data-form/data-form.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/clientes', pathMatch: 'full' },
      { path: 'clientes', component: HomeComponent },
      { path: 'cadastrar', component: DataFormComponent },
    ], withComponentInputBinding()),
    importProvidersFrom(
      BrowserAnimationsModule,
    ),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
