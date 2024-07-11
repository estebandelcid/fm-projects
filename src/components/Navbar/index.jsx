"use client";
import { useProducts } from "@/hooks/useProducts";
import { AdjustmentsHorizontalIcon, ChevronLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const filterOptions = [
  // "Correo del solicitante", "Fecha de entrega", "Planta destino", "Número de piezas",
  // "Tiene orden de compra", "Orden de compra", "Material", "Espesor",
  // "Alto", "Largo", "Nombre de archivo", "Incluye tope",
  // "Cantidad de topes", "Fecha y hora de solicitud", "IDpedido"
  "IDpedido","CorreoSolicitante", "FechaEntrega", "PlantaDestino", "NumeroPiezas", "TieneOrden", "OrdenCompra", "Material", "Espesor", "Alto", "Largo", "NombreArchivo", "IncluyeTope", "CantidadTopes", "FechaSolicitud",
];


export const Navbar = ({ onSearch }) => {
  const {products, filterProducts, updateFilteredProducts, clearFilters} = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSubFilterOptions, setShowSubFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showViewOptions, setShowViewOptions] = useState(false);
  
  const subFilterOptions = {
    "CorreoSolicitante": [...new Set(products.map(product => product.CorreoSolicitante))],
    "FechaEntrega": [...new Set(products.map(product => product.FechaEntrega))],
    "PlantaDestino": [...new Set(products.map(product => product.PlantaDestino))],
    "NumeroPiezas": [...new Set(products.map(product => product.NumeroPiezas))],
    "TieneOrden": [...new Set(products.map(product => product.TieneOrden))],
    "OrdenCompra": [...new Set(products.map(product => product.OrdenCompra))],
    "Material": [...new Set(products.map(product => product.Material))],
    "Espesor": [...new Set(products.map(product => product.Espesor))],
    "Alto": [...new Set(products.map(product => product.Alto))],
    "Largo": [...new Set(products.map(product => product.Largo))],
    "NombreArchivo": [...new Set(products.map(product => product.NombreArchivo))],
    "IncluyeTope": [...new Set(products.map(product => product.IncluyeTope))],
    "CantidadTopes": [...new Set(products.map(product => product.CantidadTopes))],
    "FechaSolicitud": [...new Set(products.map(product => product.FechaSolicitud))],
    "IDpedido": [...new Set(products.map(product => product.IDpedido))]
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
    setShowSubFilterOptions(false);
  };
  const toggleSubFilterOptions = (filter) => {
    if (selectedFilter === filter) {
        setShowSubFilterOptions(!showSubFilterOptions);
    } else {
        setSelectedFilter(filter);
        setShowSubFilterOptions(true);
    }
};

  const toggleViewOptions = () => {
    setShowViewOptions(!showViewOptions);
  };

  const handleFilterSelect = (option) => {
    toggleSubFilterOptions(option)
  };
  const applySubFilter = (subOption) => {
    const filters = { [selectedFilter]: subOption };
    const filteredProducts = filterProducts(filters);
    updateFilteredProducts(filteredProducts);
    toggleSubFilterOptions(subOption)
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
          className="flex items-center gap-1 bg-[#2e3a44] px-6 py-2 rounded-full text-white mr-10"
          onClick={toggleFilterOptions}
        >
          <AdjustmentsHorizontalIcon className="size-6" />
          Filtro
        </button>
        {showFilterOptions && (
          <div className="absolute z-20 bg-white shadow-md rounded-sm mt-2 right-0 w-[36rem]">
            <div className="flex justify-end p-2">
              <button
                className="flex items-center bg-[#d9d9d9] gap-1 text-gray-600 text-xs rounded-full px-4 py-2"
                onClick={() => {
                  clearFilters();
                  setSelectedFilter(null);
                }}
              >
                <TrashIcon className="size-4" />
                Borrar filtro
              </button>
            </div>
            <div className="flex flex-wrap">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  className="w-1/3 p-2  hover:bg-gray-200"
                  onClick={() => handleFilterSelect(option)}
                >
                  <div className="flex cursor-pointer">
                    <ChevronLeftIcon className="size-6" />
                    {option}
                  </div>
                  {selectedFilter === option && showSubFilterOptions && (
                    <ul className="absolute flex flex-col justify-center items-center bg-white shadow-md rounded-sm right-full top-10 ml-2 w-72 h-52 overflow-auto">
                      <li className="bg-[#f4f4f4] rounded-full px-6 flex items-center">
                        <MagnifyingGlassIcon className="size-4 text-[#929292]" />
                        <input
                          type="text"
                          className="bg-[#f4f4f4] p-2 w-1/2 text-start text-xs rounded-full outline-none"
                          placeholder="Buscar"
                        />
                      </li>
                      {subFilterOptions[option] &&
                        subFilterOptions[option].map((subOption) => (
                          <div
                            key={subOption}
                            className="px-4 py-2"
                            onClick={() => applySubFilter(subOption)}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 cursor-pointer"
                            />
                            {subOption}
                          </div>
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
          className="flex items-center gap-1 bg-[#2e3a44] px-6 py-2 rounded-full text-white mr-5"
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
