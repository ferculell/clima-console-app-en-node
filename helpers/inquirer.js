import inquirer from 'inquirer';
import colors from 'colors';


const inquirerMenu = async () => {

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            loop: false,
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green} Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2.'.green} Ver historial`
                },
                {
                    value: 0,
                    name: `${'0.'.green} Salir`
                },
            ]
        }
    ];

    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.green);
    console.log('===========================\n'.green);
    
    const { opcion } = await inquirer.prompt(preguntas);
    
    return opcion;
}

const pausar = async () => {
    const question = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc; 
}

const listarLugares = async (lugares) => {
    const choices = lugares.map( (lugar, i) => {
        const num = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${num} ${lugar.nombre}`
        }
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} ${'Cancelar'.gray}`
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar de la lista',
            loop: false,
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    
    return id;
}

const mostrarChecklist = async (tareas) => {
    const choices = tareas.map( (tarea, i) => {
        const num = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${num} ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            loop: false,
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);
    
    return ids;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    
    return ok;
}

export { inquirerMenu, pausar, leerInput, listarLugares, confirmar, mostrarChecklist };