import { IHouse } from "./IHouse";

export interface IWeatherData {
    id: number,
    dateTime: string,
    temperature: number,
    humidity: number,
    precipitation: number,
    house: IHouse,
    houseId: number,
}