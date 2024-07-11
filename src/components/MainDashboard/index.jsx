import { ProductsProvider } from "@/context/useProductsContext";
import { Sidebar } from "../Sidebar";
import { TableContainer } from "../TableContainer";

 
export default function MainDashboard() {
  return (
    <>
    <ProductsProvider>
     <main className="flex min-h-screen">
      <Sidebar />
      <TableContainer />
    </main>
    </ProductsProvider>
    </>
  )
}