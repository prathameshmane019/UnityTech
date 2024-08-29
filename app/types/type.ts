export interface IUser {
  _id: string;
  name: string;
  email: string;
  password:string;
  type: 'individual' | 'organization';
  organizationName?: string;
}

export interface IService {
  [x: string]: string;
  _id: string;
  name: string;
  description: string;
}

export interface ISubscription {
  _id?: string;
  userId: string;
  serviceId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'inactive' | 'pending';
  domain: string;
  access: boolean;
}