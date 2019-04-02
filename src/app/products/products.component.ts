import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  subscription: Subscription;
  category: string;
  filteredProducts: Product[] = [];


  constructor(
    route: ActivatedRoute,
    private productService: ProductService
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

      route.queryParamMap.subscribe( params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    });
   }


}
