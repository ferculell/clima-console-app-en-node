import * as dotenv from 'dotenv'
dotenv.config()

import colors from 'colors';
import { inquirerMenu, leerInput, listarLugares, pausar } from "./helpers/inquirer.js"
import Busquedas from "./models/busquedas.js";



const main = async() => {

    const busquedas = new Busquedas();
    let opt = '';

    do {

        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                const entrada = await leerInput('Ciudad:');
                const lugares = await busquedas.ciudad(entrada);

                const idElegido = await listarLugares(lugares);

                if (idElegido === '0') continue;

                const lugarElegido = lugares.find(item => item.id === idElegido);

                const resClima = await busquedas.clima(lugarElegido.lat, lugarElegido.lng);

                busquedas.agregarHistorial(lugarElegido.nombre);

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarElegido.nombre.green);
                console.log('Lat: ', lugarElegido.lat);
                console.log('Long: ', lugarElegido.lng);
                console.log('Clima: ', resClima.desc.green);
                console.log('Temperatura: ', resClima.temp);
                console.log('Mínima: ', resClima.min);
                console.log('Máxima: ', resClima.max);
                break;
            
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const num = `${i+1}.`.green;
                    console.log(`${num} ${busquedas.capitalizarString(lugar)}`);
                });
                break;

            case 0:
                console.log('\nGracias por utilizar nuestra aplicación\n');
                break;
        
            default:
                console.log('Algún error no previsto ha ocurrido');
                break;
        }

        if (opt !== 0) {
            await pausar();
        }

    } while (opt !== 0);

}

main();