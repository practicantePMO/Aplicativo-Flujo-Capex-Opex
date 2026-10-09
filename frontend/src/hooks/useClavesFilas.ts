import { useState } from 'react';

let ultimaClave = 0;
const nuevaClave = () => {
  ultimaClave += 1;
  return ultimaClave;
};

// Da una clave estable (key de React) a cada fila de una lista editable cuyas
// filas no tienen id propio. Usar el índice como key hace que, al borrar una
// fila del medio, React confunda las filas siguientes; estas claves no cambian.
// Llama a quitarClave(i) junto con borrar la fila i de la lista.
export function useClavesFilas(cantidad: number) {
  const [claves, setClaves] = useState<number[]>(() => Array.from({ length: cantidad }, nuevaClave));

  let actuales = claves;
  if (claves.length !== cantidad) {
    actuales = claves.length < cantidad
      ? [...claves, ...Array.from({ length: cantidad - claves.length }, nuevaClave)]
      : claves.slice(0, cantidad);
    setClaves(actuales);
  }

  const quitarClave = (indice: number) => setClaves((prev) => prev.filter((_, i) => i !== indice));

  return { claves: actuales, quitarClave };
}
