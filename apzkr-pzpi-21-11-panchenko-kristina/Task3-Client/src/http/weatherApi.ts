import { $authhost } from ".";
import { IWeatherChangeData } from "../interfaces/ChangeInterfaces/IWeatherChangeData";
import { IWeatherCreateData } from "../interfaces/CreateInterfaces/IWeatherCreateData";

export const getWeatherDatas = async () => {
    const { data } = await $authhost.get('api/WeatherDatas')
    return data;
}

export const createWeatherData = async (formData: IWeatherCreateData) => {
    const { data } = await $authhost.post('api/WeatherDatas', formData)
    return data;
}

export const editWeatherData = async (id: number, formData: IWeatherChangeData) => {
    const { data } = await $authhost.put(`api/WeatherDatas/${id}`, formData)
    return data;
}

export const deleteWeatherData = async (id: number) => {
    const { data } = await $authhost.delete(`api/WeatherDatas/${id}`)
    return data;
}
