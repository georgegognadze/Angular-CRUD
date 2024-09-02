import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  templateUrl: './client-detail.html',
  styleUrls: ['./client-detail.css'],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class ClientDetail implements OnInit {
  client: any;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) { }

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.loadClient(id);
      }
    });
  }

  loadClient(id: number): void {
    this.clientService.getClientById(id).subscribe(
      client => {
        console.log('Client data:', client);
        this.client = client;
      },
      error => console.error('Error fetching client:', error)
    );
  }
  
}
