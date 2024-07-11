"use client"
import { useState } from 'react';

// Hook personalizado para manejar el localStorage
const useLocalStorage = (key, initialValue) => {
  // Estado local para almacenar el valor actual en localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Intenta obtener el valor almacenado en localStorage por la clave especificada
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Manejar errores devolviendo el valor inicial
      console.error(`Error al obtener valor desde localStorage:`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en localStorage
  const setValue = (value) => {
    try {
      // Permitir que el valor sea una función para que se comporte de manera similar a useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Actualizar el estado local
      setStoredValue(valueToStore);

      // Guardar el valor en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Manejar errores al guardar en localStorage
      console.error(`Error al guardar valor en localStorage (${key}):`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
