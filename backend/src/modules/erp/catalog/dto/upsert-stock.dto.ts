import { IsString } from 'class-validator';

export class UpsertStockDto {
  @IsString()
  productId!: string;

  @IsString()
  branchId!: string;

  quantity!: number;

  minQuantity?: number;
}
