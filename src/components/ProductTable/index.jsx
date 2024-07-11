"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useProducts } from "@/hooks/useProducts";
import { authKey } from "@/lib/constants";
import { useState } from "react";
export const ProductTable = () => {
  const { products, loading, error, setProducts } = useProducts();
  const [storedValue] = useLocalStorage(authKey);
  const [statusOptions] = useState(["En proceso", "Completado", "Rechazado"]);
  const handleStatusChange = async (IDpedido, newStatus) => {
    const token = storedValue;

    try {
      const response = await fetch(
        `http://corte.fymmx.com/plantillas/changeStatus?IDpedido=${IDpedido}&status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setProducts((prevProducts) => prevProducts.map((product) => 
      product.IDpedido === IDpedido ? {... product, status: newStatus } : product
      )
    );
    } catch (error) {
      console.error("Error changing status: ", error);
    }
  };
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }
  const getStatusClass = (status) => {
    switch (status) {
      case "En proceso":
        return "bg-[#c7e9ff]";
      case "Completado":
        return "bg-[#b2fb8b]";
      case "Rechazado":
        return "bg-[#f88080]";
      default:
        return "";
    }
  };
  return (
    <>
      <div className="w-[calc(100vw-200px)] overflow-auto h-[calc(100vh-250px)] rounded-sm fixed bottom-10">
        <table className="w-full table-fixed bg-white">
          <thead>
            <tr className="bg-[#2e3a44] text-xs text-white sticky top-0">
              <th className="py-2 px-4 w-32">Status</th>
              <th className="py-2 px-4 w-32">Fecha de entrega</th>
              <th className="py-2 px-4 w-32">Planta destino</th>
              <th className="py-2 px-4 w-32">Núm. piezas</th>
              <th className="py-2 px-4 w-24">Tiene orden de compra</th>
              <th className="py-2 px-4 w-32">Orden de compra</th>
              <th className="py-2 px-4 w-32">Material</th>
              <th className="py-2 px-4 w-32">Alto</th>
              <th className="py-2 px-4 w-32">Largo</th>
              <th className="py-2 px-4 w-32">Nombre del archivo</th>
              <th className="py-2 px-4 w-32">Incluye tope</th>
              <th className="py-2 px-4 w-32">Cantidad de topes</th>
              <th className="py-2 px-4 w-32">Fecha y hora de solicitud</th>
              <th className="py-2 px-4 w-32">ID</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.IDpedido}
                className={`text-black text-center ${getStatusClass(
                  product.status
                )}`}
              >
               <td className="py-2 px-4">
                <select
                  value={product.status}
                  onChange={(e) => handleStatusChange(product.IDpedido, e.target.value)}
                  className="bg-transparent border border-black rounded-full px-1 py-1"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
                <td className="py-2 px-4 w-32">{product.FechaEntrega}</td>
                <td className="py-2 px-4">{product.PlantaDestino}</td>
                <td className="py-2 px-4">{product.NumeroPiezas}</td>
                <td className="py-2 px-4">{product.TieneOrden}</td>
                <td className="py-2 px-4">{product.OrdenCompra}</td>
                <td className="py-2 px-4">{product.Material}</td>
                <td className="py-2 px-4">{product.Alto}</td>
                <td className="py-2 px-4">{product.Largo}</td>
                <td className="py-2 px-4">{product.NombreArchivo}</td>
                <td className="py-2 px-4">{product.IncluyeTope}</td>
                <td className="py-2 px-4">{product.CantidadTopes}</td>
                <td className="py-2 px-4">{product.FechaSolicitud}</td>
                <td className="py-2 px-4">{product.IDpedido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
