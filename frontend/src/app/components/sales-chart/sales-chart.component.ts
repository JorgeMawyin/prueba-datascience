import { Component, Input, OnChanges } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-sales-chart',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.css',
})
export class SalesChartComponent implements OnChanges {
  @Input() filters: any;

  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
  };

  constructor(private salesService: SalesService) {}

  ngOnChanges(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.salesService.getSalesTimeline(this.filters).subscribe({
      next: (data) => {
        this.chartData = [
          {
            data: data.map((item: any) => item.total_sales),
            label: 'Ventas',
          },
        ];
        this.chartLabels = data.map((item: any) => item.date);
      },
      error: (err) => {
        console.error('Error al cargar los datos del gráfico:', err);
      },
    });
  }
}
