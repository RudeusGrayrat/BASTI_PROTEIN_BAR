export type CatalogProduct = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  category: string;
  priceCents: number;
  currency: string;
  available: boolean;
  preview?: boolean;
};
export type CartLine = { product: CatalogProduct; quantity: number };
export type Catalog = {
  products: CatalogProduct[];
  currency: string;
  branchId: string | null;
};
export type CustomerOrder = {
  id: string;
  number: string;
  status: string;
  createdAt: string;
  totalCents: number;
  currency: string;
  items: { name: string; quantity: number; totalCents: number }[];
};
export type CustomerWallet = {
  points: number;
  lifetimePoints: number;
  tier: string | null;
  movements: {
    id: string;
    points: number;
    reason: string | null;
    createdAt: string;
  }[];
};

export type StorefrontConfiguration = {
  slug: string;
  legalName?: string;
  websiteUrl?: string | null;
  loyalty?: {
    spendAmountCents: number;
    pointsEarned: number;
    discountPerPointCents: number;
    onlineRedemptionEnabled: boolean;
  };
  name: string;
  phone: string | null;
  email: string | null;
  logoUrl: string | null;
  currency: string;
  timezone: string;
  branches: {
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
  }[];
  paymentMethods: { id: string; name: string; type: string }[];
  orderingEnabled: boolean;
};
