import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";

//Fonts
import { inter } from "@/Fonts";

//Query
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = ({ Component, pageProps }: AppProps) => {
  //Client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <style jsx global>{`
      html {
        font-family: ${inter.style.fontFamily};
      }
    `}
        </style>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default App;