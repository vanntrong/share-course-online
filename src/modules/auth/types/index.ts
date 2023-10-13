export type User = {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  token: string;
  role: UserRole;
};

export enum UserRole {
  User = "user",
  Admin = "admin",
}
