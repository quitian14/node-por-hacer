const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarBD = () => {


    let datos = JSON.stringify(listadoPorHacer);

    const data = new Uint8Array(Buffer.from(datos));
    fs.writeFile(`./bd/data.json`, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('object');
        }

    });
};

const cargarDB = () => {

    try {
        listadoPorHacer = require('../bd/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

};

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarBD();

    return porHacer;

};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;

};

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    }

    return false;

};

const borrar = (descripcion) => {
    cargarDB();

    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    let listadoNuevo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    //if (index >= 0) {
    // listadoPorHacer.splice(index, 1);
    // guardarBD();
    //  return true;
    // }

    if (listadoNuevo.length === listadoPorHacer.length) {
        return true;
    } else {
        listadoPorHacer = listadoNuevo;
        guardarBD();
        return true;
    }

};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}