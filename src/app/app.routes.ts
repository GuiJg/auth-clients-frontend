import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataFormComponent } from './data-form/data-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    component: HomeComponent
  },
  {
    path: 'cadastrar',
    component: DataFormComponent
  },
  {
    path: '**',
    redirectTo: '/clientes'
  }
];
