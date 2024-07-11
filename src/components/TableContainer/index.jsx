"use client"
import { useProducts } from "@/hooks/useProducts";
import { ProductTable } from "../ProductTable";
import {
  ClockIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export const TableContainer = () => {
  const { products } = useProducts();
  return (
    <div className="ml-52 w-full h-full p-4">
      <h1 className="text-white text-3xl font-bold underline underline-offset-8">
        PEDIDOS
      </h1>
      <section className=" w-8/12 flex justify-between py-6">
        <div className="w-40 flex justify-between items-center rounded-sm bg-[#f7f7f7] px-6 py-4">
          <DocumentTextIcon className="size-11" />
          <p className="flex flex-col justify-center items-center">
            <span className="font-semibold text-lg">{products.length}</span>
            <span className="text-xs">pedidos</span>
          </p>
        </div>
        <div className="w-40 bg-[#f7f7f7] flex justify-between items-center px-6 py-4">
          <ClockIcon className="size-11 text-[#027bcb]" />
          <p className="flex flex-col justify-center items-center">
            <span className="font-semibold text-lg">{products.filter(product => product.status === 'En proceso').length}</span>
            <span className="text-xs">en proceso</span>
          </p>
        </div>
        <div className="w-40 bg-[#f7f7f7] flex justify-between items-center px-6 py-4">
          <XCircleIcon className="size-11 text-[#f88080]" />
          <p className="flex flex-col justify-center items-center">
            <span className="font-semibold text-lg">{products.filter(product => product.status === 'Rechazado').length}</span>
            <span className="text-xs">rechazado</span>
          </p>
        </div>
        <div className="w-40 bg-[#f7f7f7] flex justify-between items-center px-6 py-4">
          <DocumentCheckIcon className="size-11 text-[#96d871]" />
          <p className="flex flex-col justify-center items-center">
            <span className="font-semibold text-lg">{products.filter(product => product.status === 'Completado').length}</span>
            <span className="text-xs">listo</span>
          </p>
        </div>
      </section>
      <ProductTable />
    </div>
  );
};
