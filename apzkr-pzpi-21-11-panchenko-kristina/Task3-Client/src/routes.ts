import { ComponentType } from "react";
import { BATTERIES_ROUTE, CUSTOMERS_ROUTE, HOUSES_ROUTE, MAIN_ROUTE, PANELS_ROUTE, PANEL_TYPES_ROUTE, WEATHER_DATA_ROUTE } from "./consts";
import { Batteries } from "./pages/Batteries";
import { Customers } from "./pages/Customers";
import { Houses } from "./pages/Houses";
import { MainPage } from "./pages/MainPage";
import { Panels } from "./pages/Panels";
import { PanelTypes } from "./pages/PanelTypes";
import { WeatherDatas } from "./pages/WeatherDatas";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: BATTERIES_ROUTE, Component: Batteries },
    { path: CUSTOMERS_ROUTE, Component: Customers },
    { path: HOUSES_ROUTE, Component: Houses },
    { path: PANELS_ROUTE, Component: Panels },
    { path: PANEL_TYPES_ROUTE, Component: PanelTypes },
    { path: WEATHER_DATA_ROUTE, Component: WeatherDatas },
]