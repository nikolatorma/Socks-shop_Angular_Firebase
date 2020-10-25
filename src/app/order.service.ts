import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/order').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/order', query => query.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }

  get(orderId): Observable<Order> {
    return this.db.object<Order>('/orders/' + orderId)
      .valueChanges()
      .pipe(take(1));
  }

  delete(orderID) {
    return this.db.object('/orders/' + orderID).remove();
  }
}
