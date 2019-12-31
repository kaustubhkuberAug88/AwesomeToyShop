/* Defines the toy entity */
export interface Toy {
  id: number;
  toyName: string;
  toyCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export interface ToyResolved {
  toy: Toy;
  error?: any;
}
