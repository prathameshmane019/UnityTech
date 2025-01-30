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
}