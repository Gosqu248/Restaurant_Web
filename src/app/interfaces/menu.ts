export interface Menu {
  id: number;
  name: string;
  category: string;
  ingredients?: string;
  price: number;
  imageUrl: string | null;
}
