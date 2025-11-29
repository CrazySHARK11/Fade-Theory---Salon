import "../styles/global.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "../store/store";
import Loading from "../components/Loading";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
 

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor} >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
