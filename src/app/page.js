import { ProductTable } from "@/components/ProductTable";
import { Sidebar } from "@/components/Sidebar";
import { TableContainer } from "@/components/TableContainer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <TableContainer />
    </main>
  );
}