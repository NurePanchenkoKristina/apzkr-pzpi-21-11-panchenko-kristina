import { IWeatherCreateData } from "../CreateInterfaces/IWeatherCreateData";

export interface IWeatherChangeData extends IWeatherCreateData {
    id: number,
}