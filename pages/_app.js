import "../styles/global.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "../store/store";
import Loading from "../components/Loading";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate loading={<Loading />} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </PersistGate>
      ) : (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      )}
    </Provider>
  );
}
