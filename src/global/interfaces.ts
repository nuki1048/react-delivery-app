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
export interface CartItemOrder {
  name: string;
  amount: number;
  price: number;
}

export interface Order extends firebaseDocument {
  credentials: Credentials;
  delivery: Delivery;
  items: CartItemOrder[];
  total: Total;
  userId?: string | undefined;
}

interface Credentials {
  email: string;
  name: string;
  orderNum: string;
}
interface Delivery {
  region: string;
  country: string;
  index: string;
}

export interface Total {
  taxes: number;
  subtotal: number;
  total: number;
}

export interface User {
  displayName: string;
  email: string;
  phoneNumber: string;
  uid: string;
}
export type View = 'profile' | 'edit';

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
