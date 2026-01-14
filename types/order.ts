export interface OrderProps {
  id: string;
  orderNumber: number;
  createdAt: Date;
  total: number;
  paymentStatus: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  _count: {
    items: number;
  };
  isSelected?: boolean;
  onSelect?: () => void;
}
  