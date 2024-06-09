import { $authhost } from ".";
import { ICustomerChangeData } from "../interfaces/ChangeInterfaces/ICustomerChangeData";
import { ICustomerCreateData } from "../interfaces/CreateInterfaces/ICustomerCreateData";

export const getCustomers = async () => {
    const { data } = await $authhost.get('api/Customers')
    return data;
}

export const createCustomer = async (formData: ICustomerCreateData) => {
    const { data } = await $authhost.post('api/Customers', formData)
    return data;
}

export const editCustomer = async (id: number, formData: ICustomerChangeData) => {
    const { data } = await $authhost.put(`api/Customers/${id}`, formData)
    return data;
}

export const deleteCustomer = async (id: number) => {
    const { data } = await $authhost.delete(`api/Customers/${id}`)
    return data;
}
