import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    /**
     * Loads some data from user's local storage.
     * @param item the name of the key to load
     * @returns the data saved in the local storage.
     * * If no data is found, `null` is returned.
     * * If data is an object, it is parsed using `JSON.parse()` and returned.
     * * If data is a number, it is parsed using `Number()` and returned.
     * * If data is a boolean or a string, it is returned unmodified.
     */
    public loadAny(item: string): null | object | number | boolean | string {
        let data = localStorage.getItem(item);
        if (!data || data == 'null') return null;
        if (data.trim().match(/^[\[\{]/)) return JSON.parse(data);
        if (Number(data)) return Number(data);
        return data;
    }
    
    /**
     * Loads some data from user's local storage.
     * @param item the name of the key to load
     * @returns the data saved in the local storage.
     * * If no data is found, `null` is returned.
     * * If any data is found, it is returned as `string`.
     */
    public loadString(item: string): null | string {
        let data = localStorage.getItem(item);
        if (!data || data == 'null') return null;
        return data;
    }

    /**
     * Loads some data from user's local storage.
     * @param item the name of the key to load
     * @returns the data saved in the local storage.
     * * If valid data is found, it is returned as `boolean`.
     * * If no data or invalid data is found, `null` is returned.
     */
    public loadBool(item: string): null | boolean {
        let data = localStorage.getItem(item);
        if (data?.match(/^(?:true|false)$/)) return data == 'true';
        return null;
    }

    /**
     * Loads some data from user's local storage.
     * @param item the name of the key to load
     * @returns the data saved in the local storage.
     * * If valid data is found, it is returned as `number`.
     * * If no data or invalid data is found, `null` is returned.
     */
    public loadNumber(item: string): null | number {
        let data = localStorage.getItem(item);
        if (Number(data)) return Number(data);
        return null;
    }

    /**
     * Saves some data to user's local storage.
     * @param key the name of the key to save to
     * @param data the data to be saved
     * @returns `true` if the save was succesful, otherwise `false`.
     */
    public save(key: string, data: any) {
        try {
            let dataStr!: string;
            if (typeof data == 'string') dataStr = data;
            else dataStr = JSON.stringify(data);

            localStorage.setItem(key, dataStr);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
