import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { App } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/data.service';
import { ClientDetail } from './components/client-detail/client-detail';
import { ClientList } from './components/client-list/client-list';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    App,
    ClientList,
    ClientDetail
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgxPaginationModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [App]
})
export class AppModule { }
