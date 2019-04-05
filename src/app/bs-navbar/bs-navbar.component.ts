import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from 'src/models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items ) {
       this.shoppingCartItemCount += cart.items[productId].quantity;
     }
    });

  }

  logout() {
    this.auth.logout();
  }
}
