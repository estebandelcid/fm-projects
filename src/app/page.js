"use client"
import { ProductTable } from "@/components/ProductTable";
import { Sidebar } from "@/components/Sidebar";
import { TableContainer } from "@/components/TableContainer";
import { ProductsProvider } from "@/context/useProductsContext";
import Image from "next/image";

export default function Home() {
  return (
    <ProductsProvider>
     <main className="flex min-h-screen">
      <Sidebar />
      <TableContainer />
    </main>
    </ProductsProvider>
   
  );
}