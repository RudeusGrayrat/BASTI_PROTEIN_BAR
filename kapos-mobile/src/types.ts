export type DocumentType = "DNI" | "CE" | "PASSPORT";

export type AuthUser = {
  id: string;
  email: string | null;
  documentType: DocumentType | null;
  documentNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  status: "ACTIVE" | "INVITED" | "SUSPENDED" | "DISABLED";
};

export type MobileAuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type MembershipAccessSummary = {
  organizationId: string;
  organizationSlug: string;
  organizationName: string;
  membershipId: string;
  membershipStatus: "INVITED" | "ACTIVE" | "SUSPENDED" | "INACTIVE" | "TERMINATED";
  roleKeys: string[];
  permissionKeys: string[];
  branchIds: string[];
  moduleKeys: string[];
};

export type ErpAccessSummary = {
  user: AuthUser;
  memberships: MembershipAccessSummary[];
  effectivePermissionKeys: string[];
};

export type BranchSummary = {
  id: string;
  code: string | null;
  name: string;
  address: string | null;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE" | "CLOSED";
};

export type PaymentMethodSummary = {
  id: string;
  code: string;
  name: string;
  type: "CASH" | "CARD" | "DIGITAL_WALLET" | "BANK_TRANSFER" | "CREDIT" | "OTHER";
  enabled: boolean;
  sortOrder: number;
};

export type ProductStockSummary = {
  id: string;
  productId: string;
  branchId: string;
  quantity: number;
  minQuantity: number;
  status: "OK" | "LOW" | "OUT";
  branch?: { id: string; name: string; code: string | null };
};

export type ProductSummary = {
  id: string;
  categoryId: string | null;
  sku: string | null;
  name: string;
  description: string | null;
  type: "PRODUCT" | "SERVICE" | "INGREDIENT" | "COMBO";
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  price: number;
  cost: number | null;
  taxRate: number | null;
  trackStock: boolean;
  availableForPos: boolean;
  imageUrl: string | null;
  category?: { id: string; name: string; slug: string } | null;
  stockItems: ProductStockSummary[];
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type CashRegisterSummary = {
  id: string;
  branchId: string;
  code: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  sortOrder: number;
  branch?: { id: string; name: string; code: string | null; status?: string };
};

export type CashMovementSummary = {
  id: string;
  type: "INCOME" | "EXPENSE" | "WITHDRAWAL" | "DEPOSIT" | "ADJUSTMENT";
  amount: number;
  concept: string;
};

export type CashSessionSummary = {
  id: string;
  branchId: string;
  cashRegisterId: string;
  status: "OPEN" | "CLOSED" | "CANCELLED";
  openingAmount: number;
  expectedAmount: number | null;
  countedAmount: number | null;
  differenceAmount: number | null;
  openedAt: string;
  closedAt: string | null;
  openingNote: string | null;
  closingNote: string | null;
  branch?: { id: string; name: string; code: string | null };
  cashRegister?: { id: string; name: string; code: string; status: string };
  movements: CashMovementSummary[];
};

export type PaymentIntent = {
  id: string;
  amount: number | string;
  provider: string;
  providerRef: string | null;
  status: "PENDING" | "CONFIRMED" | "FAILED" | "CANCELLED";
  branchId: string | null;
  cashSessionId: string | null;
  paymentMethodId: string | null;
};

export type SaleSummary = {
  id: string;
  saleNumber: string;
  status: string;
  total: number;
  paidTotal: number;
  changeTotal: number;
};

export type CartItem = {
  product: ProductSummary;
  quantity: number;
};
