// @ts-nocheck

import { paths } from './endpoints';
import useAuthStore from "@/store/authStore.ts";
import {WeatherForecast} from "@/types/global.ts";

type Path = keyof paths;
type PathMethod<T extends Path> = keyof paths[T];

type RequestParams<P extends Path, M extends PathMethod<P>> = paths[P][M] extends {
        parameters: any;
    }
    ? paths[P][M]['parameters']
    : undefined;
type ResponseType<P extends Path, M extends PathMethod<P>> = paths[P][M] extends {
        responses: { 200: { schema: { [x: string]: any } } };
    }
    ? paths[P][M]['responses'][200]['schema']
    : undefined;

export const apiCall = <P extends Path, M extends PathMethod<P>>(
    url: P,
    method: M,
    ...params: RequestParams<P, M> extends undefined ? [] : [RequestParams<P, M>]
): Promise<ResponseType<P, M>> => {
};

export async function getWeatherForecast({currentTry = 0, jwtToken, refreshToken, hydrate}) : Promise<WeatherForecast[]> {
    console.log("Test1");
    
    console.log("Trying to get weather forecast...");
    const response = await fetch("api/v1/weatherforecast", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    });
    
    if(response.ok) {
        console.log("Weather forecast fetched successfully!");
        return await response.json() as WeatherForecast[];
    }
    else if(response.status === 401 && currentTry === 0) {
        await hydrate();
        return await getWeatherForecast({currentTry : 1});
    }
    
    throw new Error("Error fetching weather forecast");
}