export class CreateCartDto {
  userId: number;
  products: { productId: number; quantity: number }[];
}
