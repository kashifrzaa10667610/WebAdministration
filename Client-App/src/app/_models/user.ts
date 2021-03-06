export interface User {
    id?: number;
    username?: string;
    password?:string,
    confirmPassword?:string,
    gender?:string,
    name?:string,
    email?:string,
    dateOfBirth?:string,
    city?:string,
    country?:string
    created?: Date;
    lastActive?: Date;
    
    roles?: string[];
  }