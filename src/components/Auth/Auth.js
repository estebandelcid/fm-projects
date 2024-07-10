"use client"
import useLocalStorage from "@/hooks/useLocalStorage";
import { authKey } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Auth = () => {
    const [storedValue] = useLocalStorage(authKey, null);
    const [isAuthChecked, setAuthChecked] = useState(false)
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (!isAuthChecked) {
            if (storedValue) {
                router.push('/');
            } else if (pathname !== '/register') {
                router.push('/login');
            }
            setAuthChecked(true);
        }

    }, [storedValue, router, pathname, isAuthChecked])
   

    return null
}