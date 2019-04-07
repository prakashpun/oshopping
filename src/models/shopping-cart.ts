import { ShoppingCartItem } from './shopping-cart-items';

export class ShoppingCart {

    constructor(public items: ShoppingCartItem[]) {

    }

    get productIds() {
        return Object.keys(this.items);
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}

