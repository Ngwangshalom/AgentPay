export interface User {
  id?: string;
  fullName: string;
  avatar: string;
  location?: string;
}

export interface Services {
  route(route: any): void;
  name: string;
  icon: string;
}
