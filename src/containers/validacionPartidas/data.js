import React from "react";
import namor from "namor";
let i = 0
const range = len => {
    const arr = [];
    for (i; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    return {
        id_auditoria: i++,
        archivo: namor.generate({ words: 1, numbers: 0 }) + '.xls',
        sucursal: Math.floor(Math.random() * 50),
        creador: namor.generate({ words: 3, numbers: 0, char: ' ' }),
        partidas: Math.floor(Math.random() * 100),
        status: 'Estatus',
        tipo: 'Caja Cerrada',
        action: ''
    };
};

export function getData(len = 8) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}