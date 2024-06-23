import { IHouse } from "./IHouse";

export interface IBattery {
    id: number,
    houseId: number,
    house: IHouse,
    capacity: number,
    batteryType: string,
    installationDate: string
}