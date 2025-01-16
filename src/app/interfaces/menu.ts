export interface Menu {
  id: number;
  name: string;
  category: string;
  ingredients?: string;
  price: number;
  image?: Blob;
  imageUrl?: string;
}
