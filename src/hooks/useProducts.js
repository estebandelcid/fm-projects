"use client"
import { useProductsContext } from "@/context/useProductsContext";

export const useProducts = () => {
    return(useProductsContext())
};