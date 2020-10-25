import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<{ }>;
  @Input("category") category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();}

}
