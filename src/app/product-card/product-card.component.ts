import { Component, Input } from '@angular/core';
import { Product } from 'src/models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions: true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  
  getQuantity() {
    if (!this.ShoppingCart) { return 0; }
    const item = this.ShoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
