import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientList } from './components/client-list/client-list';
import { ClientDetail } from './components/client-detail/client-detail';
import { ClientEdit } from './components/client-edit/client-edit';
import { ClientForm } from './components/client-form/client-form';
import { ReactiveFormsModule } from '@angular/forms';
export const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientList },
  { path: 'clients/add', component: ClientForm },
  { path: 'clients/:id', component: ClientDetail },
  { path: 'clients/:edit/:id', component: ClientEdit },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '**', redirectTo: '/clients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
