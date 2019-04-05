import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subscription: Subscription;
  category: string;
  filteredProducts: Product[] = [];
  cart: any;


  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {


    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products.map(
          product => {
            return <Product>{
              title: product.payload.val()['title'],
              category: product.payload.val()['category'],
              imageUrl: product.payload.val()['imageUrl'],
              price: product.payload.val()['price'],
              key: product.key
            }
          }
        );

        route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        });
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
