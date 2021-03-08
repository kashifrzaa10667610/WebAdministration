export interface User {
    id: number;
    username: string;
    password?:string,
    confirmPassword?:string,
    gender?:string,
    name?:string,
    email?:string,
    dateOfBirth?:string,
    age:string;
    city?:string,
    country?:string
    created?: Date;
    lastActive?: Date;
    lockoutEnd?:Date
    roles?: string[];
  }