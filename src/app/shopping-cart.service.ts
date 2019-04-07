import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'src/models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'src/models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges().pipe(
      map((x: any) => new ShoppingCart(x.payload.val().items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number ) {
    const cartId = await this.getOrCreateCartId();
    const items = this.getItem(cartId, product.key);
    items.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) {
        items.update({ product, quantity: item.payload.val().quantity + change });
      } else {
        items.update({ product, quantity: 1 });
      }
    });
  }
}