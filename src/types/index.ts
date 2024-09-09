import { SelectProps } from "@radix-ui/react-select";

export type StoreType = {
  apiClient: any;
  preloadedState?: any;
};

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type User = {
  name: string;
  uname: string;
  token: string;
  id: string;
};

export type PageLayoutProps = {
  children: any;
};

export type NavLinkType = {
  path: string;
  name: string;
};

export type ListType<T> = {
  data: T[];
  renderer: (d: T, i: number) => any;
};

export type SelectOptionType = {
  label: string;
  value: string;
};

export type SelectType = SelectProps & {
  placeholder: string;
  options: SelectOptionType[];
  onChange?: any
};

export type TabProductType = {
  title: string;
  rating: number;
  image: string;
};

export type ProductDetailType = {
  icon: any;
  title: string;
  desc: any;
  url?: string;
};

export type FieldsetType = {
  title?: string;
  children: any;
};

export type BankType = {
  _id: string;
  name: string;
  website: string;
  description: string;
  email: string;
  logo: {
    url: string;
  };

  localName: string;
  mainShareholder: string;
  percentShareholder: number;
  namePCA: string;
  nameDG: string;
  headquarter: string;
  branchCount: number;
  atmCount: number;
  customerCount: number;
  postal: string;
  contact: string[];
  coverImage: {
    url: string;
  };

  mobileBanking: [];
};

export type ImageType = {
  _id: string;
  url: string;
};

export type ATMType = {
  _id: string;
  name: string;
  description: string;
  services: string[];
  image: ImageType;
  country: string;
  region: string;
  city: string;
  address: string;
  longitude: number;
  latitude: number;
  organisation?: BankType;
};

export type LimitType = {
  dairy: string;
  weekly: string;
  monthly: string;
};
export type CardType = {
  _id: string;
  name: string;
  description: string;
  features: string[];
  requirements: string[];
  additionalFeatures: string[];
  eligeble: string[];
  stepsToApply: string[];
  services: string[];
  fees: string[];
  limits: LimitType[];
  isActive: boolean;
  image: ImageType;
  organisation: BankType;
  applyLink: string;
  created: string;
  updated: string;
};
export type LoanType = {
  _id: string;
  name: string;
  description: string;
  features: string[];
  stepsToApply: string[];
  eligeble: string[];
  customers: string[];
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  fee: string[];
  applyLink: string;
  image: ImageType;
  isActive: boolean;
  organisation: BankType;
  created: string;
  updated: string;
};


export type PriceType = {
  title: string,
  price: string,
  subText?: string
}