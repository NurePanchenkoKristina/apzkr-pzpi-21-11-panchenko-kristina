import { $authhost } from ".";
import { IPanelTypeChangeData } from "../interfaces/ChangeInterfaces/IPanelTypeChangeData";
import { IPanelTypeCreateData } from "../interfaces/CreateInterfaces/IPanelTypeCreateData";

export const getPanelTypes = async () => {
    const { data } = await $authhost.get('api/SolarPanelTypes')
    return data;
}

export const createPanelType = async (formData: IPanelTypeCreateData) => {
    const { data } = await $authhost.post('api/SolarPanelTypes', formData)
    return data;
}

export const editPanelType = async (id: number, formData: IPanelTypeChangeData) => {
    const { data } = await $authhost.put(`api/SolarPanelTypes/${id}`, formData)
    return data;
}

export const deletePanelType = async (id: number) => {
    const { data } = await $authhost.delete(`api/SolarPanelTypes/${id}`)
    return data;
}
