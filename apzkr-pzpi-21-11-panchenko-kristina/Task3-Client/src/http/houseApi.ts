import { $authhost } from ".";
import { IHouseChangeData } from "../interfaces/ChangeInterfaces/IHouseChangeData";
import { IHouseCreateData } from "../interfaces/CreateInterfaces/IHouseCreateData";

export const getHouses = async () => {
    const { data } = await $authhost.get('api/Houses')
    return data;
}

export const createHouse = async (formData: IHouseCreateData) => {
    const { data } = await $authhost.post('api/Houses', formData)
    return data;
}

export const editHouse = async (id: number, formData: IHouseChangeData) => {
    const { data } = await $authhost.put(`api/Houses/${id}`, formData)
    return data;
}

export const deleteHouse = async (id: number) => {
    const { data } = await $authhost.delete(`api/Houses/${id}`)
    return data;
}
