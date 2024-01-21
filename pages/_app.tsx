import "./globals.css";

import "driver.js/dist/driver.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class">
            <SessionContextProvider supabaseClient={supabase}>
                <Component {...pageProps} />
            </SessionContextProvider>
        </ThemeProvider>
    );
}
