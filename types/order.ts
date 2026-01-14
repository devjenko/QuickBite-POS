

export interface OrderProps {
  id: string;
  orderNumber: number;
  createdAt: Date;
  total: number;
  _count: {
    items: number;
  };
  isSelected?: boolean;
  onSelect?: () => void;
}
  