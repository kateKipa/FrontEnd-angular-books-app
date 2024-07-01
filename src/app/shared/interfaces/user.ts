export interface User {
id: number
username: string
email: string
password: string
firstname: string
lastname: string
phoneNumber: string
role: number
city: string
address: string
number: string
}

export interface Credentials {
    username: string
    password: string
    rememberMe : boolean
}

export interface JwtTokenDTO {
    userId: number;
    username: string;
    email: string;
    userRole: UserRole;
    exp: number;
}

export enum UserRole {
    SellerBuyer = 0,
    Admin = 1
  }
  