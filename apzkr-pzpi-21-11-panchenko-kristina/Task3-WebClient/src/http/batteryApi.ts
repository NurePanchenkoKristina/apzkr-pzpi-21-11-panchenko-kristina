import { $authhost } from ".";
import { IBatteryChangeData } from "../interfaces/ChangeInterfaces/IBatteryChangeData";
import { IBatteryCreateData } from "../interfaces/CreateInterfaces/IBatteryCreateData";

export const getBatteries = async () => {
    const { data } = await $authhost.get('api/Batteries')
    return data;
}

export const createBatterie = async (formData: IBatteryCreateData) => {
    const { data } = await $authhost.post('api/Batteries', formData)
    return data;
}

export const editBatterie = async (id: number, formData: IBatteryChangeData) => {
    const { data } = await $authhost.put(`api/Batteries/${id}`, formData)
    return data;
}

export const deleteBatterie = async (id: number) => {
    const { data } = await $authhost.delete(`api/Batteries/${id}`)
    return data;
}
