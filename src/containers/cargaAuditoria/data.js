import React from "react";
import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    archivo: namor.generate({ words: 1, numbers: 0 })+'.xls',
    sucursal: Math.floor(Math.random() * 50),
    creador: namor.generate({ words: 3, numbers: 0 , char: ' '}),
    partidas: Math.floor(Math.random() * 100),
    status: 'Estatus',
    action: 'Acción'
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
