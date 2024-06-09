import { ICustomer } from "./ICustomer";

export interface IHouse {
    id: number,
    address: string,
    city: string,
    region: string,
    postalCode: string,
    country: string,
    customer: ICustomer
    customerId: number,
    registrationDate: string
}