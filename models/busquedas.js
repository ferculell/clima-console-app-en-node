import fs from 'fs';
import axios from "axios";

export default class Busquedas {
    constructor() {
        this.historial = [];
        this.dbPath = './db/database.json';
        this.leerDB();
    }

    async ciudad(lugar) {

        try {

            const axiosInstance = axios.create({
                baseURL: 'http://www.mapquestapi.com/geocoding/v1/address',
                params: {
                    'key': process.env.MAPQUEST_KEY, 
                    'maxResults': 10,
                    'location': lugar,
                }
            })

            const resp = await axiosInstance.get();

            return resp.data.results[0].locations.map( lugar => ({
                id: `${lugar.latLng.lng}//${lugar.latLng.lat}`,
                nombre: `${lugar.adminArea5}, ${lugar.adminArea3}, ${lugar.adminArea1}`,
                lng: lugar.latLng.lng,
                lat: lugar.latLng.lat,
            }));

        } catch (error) {
            console.log('Ha ocurrido el siguiente error:', error);
            return [];
        }
    }

    async clima(lat, lon) {

        try {
            
            const axiosInstance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    lat,
                    lon,
                    'appid': process.env.OPENWEATHERMAP_KEY, 
                    'units': 'metric',
                    'lang': 'es',

                }
            })

            const resp = await axiosInstance.get();

            return {
                desc: resp.data.weather[0].description,
                temp: resp.data.main.temp,
                max: resp.data.main.temp_max,
                min: resp.data.main.temp_min,
            }

        } catch (error) {
            console.log('Ocurrió el siguiente error:', error);
        }

    }

    agregarHistorial(lugar) {
        if (!this.historial.includes(lugar.toLowerCase())) {

            this.historial.unshift(lugar.toLowerCase());
            this.guardarDB();

        }
    }

    capitalizarString(string) {

        let palabras = string.split(" ");
        let capitalizadas = palabras.map(palabra => {
            let letras = palabra.split("");
            let inicial = letras[0].toUpperCase();
            return `${inicial}${letras.splice(1).join("")}`
        });

        return capitalizadas.join(" ");
    }

    guardarDB() {
        const data = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(data));
    }

    leerDB() {
        try {

            const contenidoDB = fs.readFileSync(this.dbPath, {encoding:'utf-8'});
            const data = JSON.parse(contenidoDB);
            this.historial = data.historial;

        } catch (error) {
            this.historial.push('No hay registros en el historial')
        }
    }
}