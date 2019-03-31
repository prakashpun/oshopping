import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
