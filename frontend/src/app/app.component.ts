import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters.component';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';
import { TopClientsComponent } from './components/top-clients/top-clients.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    FiltersComponent,
    IndicatorsComponent,
    SalesChartComponent,
    CommonModule,
    TopClientsComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  filters = {
    start_date: '',
    end_date: '',
    category: '',
    region: '',
  };

  updateFilters(newFilters: any): void {
    this.filters = { ...newFilters };
  }
}