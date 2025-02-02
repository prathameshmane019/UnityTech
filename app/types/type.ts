export interface IUser {
  _id: string
  name: string
  email: string
  password: string 
  instituteCode?: string
  address?: string
  university?: string
  contact?: string
}

export interface IInstitute {
  _id: string;
  name: string;
  instituteCode: string;
  address: string;
  university?: string;
  contact: string;
  email: string;
  password: string;
}

export interface DemoRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  credentials?: {
    username: string;
    password: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface IService {
  _id: string;
  name: string;
  description: string;
}
export interface ISubscription {
  _id: string; // Make _id required
  userId: string;
  serviceId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'inactive' | 'pending';
  domain: string;
  access: boolean;
  cost: number
  discountPercentage: number
  billingCycle: "monthly" | "quarterly" | "annually"
  autoRenew: boolean
}