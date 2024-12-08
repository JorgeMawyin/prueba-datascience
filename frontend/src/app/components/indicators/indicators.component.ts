import { Component, Input } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-indicators',
  imports: [CommonModule],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.css',
})
export class IndicatorsComponent {
  @Input() filters: any;

  indicatorsArray: { title: string; value: number }[] = [];

  constructor(private salesService: SalesService) {}

  ngOnChanges(): void {
    this.loadIndicators();
  }

  loadIndicators(): void {
    this.salesService.getIndicators(this.filters).subscribe({
      next: (data) => {
        const indicatorsData = data[0];
        this.indicatorsArray = [
          { title: 'Ventas Totales', value: indicatorsData.total_sales },
          { title: 'Ganancias Totales', value: indicatorsData.total_profit },
        ];
      },
      error: (err) => alert(`Error al cargar indicadores: ${err.message}`),
    });
  }
}
