import { Component, Input } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-clients',
  imports: [CommonModule],
  templateUrl: './top-clients.component.html',
  styleUrl: './top-clients.component.css',
})
export class TopClientsComponent {
  @Input() filters: any;
  topClients: any[] = [];

  constructor(private apiService: SalesService) {}

  ngOnChanges(): void {
    if (this.filters) {
      this.loadTopClients();
    }
  }

  loadTopClients(): void {
    this.apiService.getTopClients(this.filters).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.topClients = data;
        } else {
          this.topClients = [];
        }
      },
      error: (err) => alert(`Error al cargar top clientes: ${err.message}`),
    });
  }
}