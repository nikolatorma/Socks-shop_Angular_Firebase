import { Component } from '@angular/core';
import { OrderService } from '../../order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  order$;
  order: any = {};
  id: string;

  constructor(private router: Router, private orderService: OrderService, private route: ActivatedRoute) {
    this.order$ = orderService.getOrders();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.orderService
        .get(this.id)
        .pipe(take(1))
        .subscribe(o => (this.order = o));
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this order?'))
      return;

    this.orderService.delete(this.id);
    this.router.navigate(['/admin/orders']);
  }
}
