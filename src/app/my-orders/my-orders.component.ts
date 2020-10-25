import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order$;

  constructor(auth: AuthService, orderService: OrderService) {
    this.order$ = auth.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }

}
