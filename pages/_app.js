import "../styles/global.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "../store/store";
import Loading from "../components/Loading";
import { PersistGate } from "redux-persist/integration/react";
import ClientOnly from "../components/ClientOnly";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ClientOnly fallback={<Loading />}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </ClientOnly>
      </QueryClientProvider>
    </Provider>
  );
}
