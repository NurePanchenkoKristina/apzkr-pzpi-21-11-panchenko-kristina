import { $authhost } from ".";
import { IPanelChangeData } from "../interfaces/ChangeInterfaces/IPanelChangeData";
import { IPanelCreateData } from "../interfaces/CreateInterfaces/IPanelCreateData";

export const getPanels = async () => {
    const { data } = await $authhost.get('api/SolarPanels')
    return data;
}

export const createPanel = async (formData: IPanelCreateData) => {
    const { data } = await $authhost.post('api/SolarPanels', formData)
    return data;
}

export const editPanel = async (id: number, formData: IPanelChangeData) => {
    const { data } = await $authhost.put(`api/SolarPanels/${id}`, formData)
    return data;
}

export const deletePanel = async (id: number) => {
    const { data } = await $authhost.delete(`api/SolarPanels/${id}`)
    return data;
}
