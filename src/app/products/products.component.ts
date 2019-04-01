import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/models/product';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  categories$;
  products: Product[];
  subscription: Subscription;


  constructor(private productService: ProductService, categoryService: CategoryService) {
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

      this.categories$ = categoryService.getCategories();
    });
   }


}
