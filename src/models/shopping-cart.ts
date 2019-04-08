import { ShoppingCartItem } from './shopping-cart-items';
import { Product } from './product';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        // tslint:disable-next-line:forin
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
}

