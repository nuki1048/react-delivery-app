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

export interface CartItemSlice
  extends Omit<MenuItem, 'storeName' | 'description'> {}

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

export enum OperationStatus {
  Loading = 'loading',
  Error = 'error',
  Idle = 'idle',
}

export enum WorkflowStatus {
  Waiting = 'waiting',
  loading = 'loading',
  EnteredToDB = 'enteredToDB',
  Error = 'error',
}
