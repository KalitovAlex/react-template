export interface User {
  uuid: string;
  email: string;
  roleUuid: string;
  phone: string;
  post: string;
  isActive: boolean;
  isForbidden: boolean;
  createdAt: string;
  updatedAt: string;
  companyUuid: string;
  role: Role;
  person: Person;
  password: string;
}

export interface Role {
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Person {
  uuid: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  userUuid: string;
  updatedAt: string;
  createdAt: string;
}
