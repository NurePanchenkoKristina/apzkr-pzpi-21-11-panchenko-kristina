import { ICustomerCreateData } from "../CreateInterfaces/ICustomerCreateData";

export interface ICustomerChangeData extends ICustomerCreateData {
    id: number,
}