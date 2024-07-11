"use client";
import { useProducts } from "@/hooks/useProducts";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const filterOptions = [
  "Correo del solicitante", "Fecha de entrega", "Planta destino", "Número de piezas", 
  "Tiene orden de compra", "Orden de compra", "Material", "Espesor", 
  "Alto", "Largo", "Nombre de archivo", "Incluye tope", 
  "Cantidad de topes", "Fecha y hora de solicitud", "ID"
];
const subFilterOptions = [
  "empresa1@correo.com", "empresa2@correo.com", "empresa3@correo.com", "empresa4@gmail.com",
];

export const Navbar = ({ onSearch }) => {
  const {products} = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSubFilterOptions, setShowSubFilterOptions] = useState(null);
  const [showViewOptions, setShowViewOptions] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
    setShowSubFilterOptions(null);
  };
  const toggleSubFilterOptions = (option) => {
    setShowSubFilterOptions(showSubFilterOptions === option ? null : option);
  }

  const toggleViewOptions = () => {
    setShowViewOptions(!showViewOptions);
  };

  return (
    <nav className="flex justify-between">
      <div className="bg-[#f4f4f4] mr-32 rounded-full px-6 flex items-center">
        <MagnifyingGlassIcon className="size-6 text-[#929292]" />
        <input
          type="text"
          className=" bg-[#f4f4f4] p-2 rounded-full outline-none"
          placeholder="buscar"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-1 bg-[#2e3a44] px-6 rounded-full text-white mr-10"
          onClick={toggleFilterOptions}
        >
          <AdjustmentsHorizontalIcon className="size-6" />
          Filtro
        </button>
        {showFilterOptions && (
          <div className="absolute z-20 bg-white shadow-md rounded-sm mt-2 right-0 w-[36rem]">
            <div className="flex justify-end p-2">
              <button className="flex items-center bg-[#d9d9d9] gap-1 text-gray-600 text-xs rounded-full px-4 py-2">
                <TrashIcon className="size-4" />
                Borrar filtro
              </button>
            </div>
            <div className="flex flex-wrap">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  className="w-1/3 p-2  hover:bg-gray-200"
                  onClick={() => toggleSubFilterOptions(option)}
                >
                  {option}
                  {showSubFilterOptions === option && (
                    <ul className="absolute flex flex-col justify-center items-center bg-white shadow-md rounded-sm right-full top-10 ml-2 w-72 h-52 overflow-auto">
                      <div className="bg-[#f4f4f4] rounded-full px-6 flex items-center">
                        <MagnifyingGlassIcon className="size-4 text-[#929292]" />
                        <input
                          type="text"
                          className="bg-[#f4f4f4] p-2 w-1/2 text-start text-xs rounded-full outline-none"
                          placeholder="Buscar"
                        />
                      </div>

                      {subFilterOptions.map((subOption) => (
                        <li
                          key={subOption}
                          className="px-4 py-2"
                        >
                          <input type="checkbox" className="mr-2 cursor-pointer" />
                          {subOption}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-1 bg-[#2e3a44] px-6 rounded-full text-white mr-5"
          onClick={toggleViewOptions}
        >
          <EyeIcon className="size-6" />
          Vista
        </button>
        {showViewOptions && (
            <ul className="absolute w-72 z-20 bg-white py-4 px-6 shadow-md rounded-sm right-5">
              <li className="flex justify-between">
              <button className="flex items-center bg-[#d9d9d9] gap-1 text-gray-600 text-xs rounded-full px-4 py-2 ml-auto">
                <TrashIcon className="size-4" />
                Borrar filtro
              </button>
              </li>
            

              <li className="">
                <input type="checkbox" className="mr-2 cursor-pointer" />
                Separar por status
              </li>
              <li className="">
                <input type="checkbox" className="mr-2 cursor-pointer" />
                En proceso
              </li>
              <li className="">
                <input type="checkbox" className="mr-2 cursor-pointer" />
                Rechazado
              </li>
              <li className="">
                <input type="checkbox" className="mr-2 cursor-pointer" />
                Listo
              </li>
            </ul>
        )}
      </div>
    </nav>
  );
};
