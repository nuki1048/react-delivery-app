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

export interface CartItemSlice {
  image: string;
  name: string;
  price: number;
  id: string;
}

export interface CartItem extends CartItemSlice {
  amount: number;
}
export interface CartOrder {
  name: string;
  amount: number;
}

interface Order {
  email: string;
  name: string;
  orderNum: number;
  region: string;
  cart: CartOrder[];
  date: Date;
}

export interface CheckoutFormOrder {
  order: Order;
}
