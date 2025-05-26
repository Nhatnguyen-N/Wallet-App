export interface TransactionType {
  id: number;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  created_at?: Date; // Thêm nếu có trường timestamp trong db
  updated_at?: string; // Thêm nếu có trường timestamp trong db
}