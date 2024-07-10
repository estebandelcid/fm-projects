"use client";

import useProducts from "@/hooks/useProducts";
export const ProductTable = () => {
  const { products, loading, error } = useProducts();
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
                <td className="py-2 px-4 ">{product.status}</td>
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
