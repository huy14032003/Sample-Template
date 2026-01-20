export interface Merchant {
  id: string | number;
  name: string;
  code?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // Allow additional properties
}

export interface MerchantWithNo extends Merchant {
  no: number;
}
