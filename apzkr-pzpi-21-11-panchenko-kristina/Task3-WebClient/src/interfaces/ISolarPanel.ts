import { IHouse } from "./IHouse";
import { ISolarPanelType } from "./ISolarPanelType";

export interface ISolarPanel {
    id: number,
    house: IHouse,
    houseId: number,
    name: string,
    frameColor: string,
    panelType: ISolarPanelType,
    panelTypeId: number,
    installationDate: string
}