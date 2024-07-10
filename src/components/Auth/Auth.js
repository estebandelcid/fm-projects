"use client"
import useLocalStorage from "@/hooks/useLocalStorage";
import { authKey } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const Auth = () => {
    const [storedValue] = useLocalStorage(authKey);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if(storedValue) {
            router.push('/')
        } else if(pathname !== '/register'){
            router.push('/login')
        }
    }, [storedValue, router, pathname])
   

    return null
}