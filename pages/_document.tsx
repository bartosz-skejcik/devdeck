import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="min-h-screen bg-background text-foreground">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
