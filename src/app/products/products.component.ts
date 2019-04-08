import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from 'src/models/shopping-cart';

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
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
    this.populateProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private populateProducts() {

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

        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();
        });
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
