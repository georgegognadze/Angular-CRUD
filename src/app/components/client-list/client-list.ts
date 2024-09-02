import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../shared/models/client';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageFallbackDirective } from './ImageFallbackDirective';

@Component({
  selector: 'app-client-list',
  standalone: true,
  templateUrl: './client-list.html',
  styleUrls: ['./client-list.css'],
  imports: [RouterModule, NgxPaginationModule, CommonModule, ImageFallbackDirective]
})
export class ClientList implements OnInit {
  clients: Client[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  sortField: string = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients(this.sortField, this.sortOrder).subscribe(
      clients => {
        console.log('Fetched clients:', clients)
        this.clients = clients;
      },
      error => console.error('Error fetching clients:', error)
    );
  }  

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  
    console.log(`Sorting by: ${this.sortField}, Order: ${this.sortOrder}`)
    this.loadClients();
  }
  

  deleteClient(id: string): void {
    this.clientService.deleteClient(id.toString()).subscribe(
      () => this.loadClients(),
      error => console.error('Error deleting client:', error)
    );
  }
}
