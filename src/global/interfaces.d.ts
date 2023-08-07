export interface firebaseDocument {
  id: string;
}

export interface MenuItem extends firebaseDocument {
  name: string;
  storeName: string;
  price: number;
  description: string;
  image: string;
}
export interface RestaurantListItem extends firebaseDocument {
  category: string;
  name: string;
  rating: number;
  startingPrice: number;
  visible?: boolean;
}
export interface Cart {
  [key: string]: string;
}

interface Order {
  email: string;
  name: string;
  orderNum: number;
  region: string;
  cart: Cart;
  date: Date;
}

export interface CheckoutFormOrder {
  order: Order;
}
