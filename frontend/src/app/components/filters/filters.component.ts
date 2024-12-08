import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [FormsModule, CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  filters = {
    start_date: '',
    end_date: '',
    category: '',
    region: '',
  };

  categories: string[] = [];

  regions: string[] = [];

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadRegions();
  }

  loadCategories(): void {
    this.salesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error loading categories:', err),
    });
  }

  loadRegions(): void {
    this.salesService.getRegions().subscribe({
      next: (data) => {
        this.regions = data;
      },
      error: (err) => console.error('Error loading regions:', err),
    });
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filters);
  }
}
