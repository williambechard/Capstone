import "../styles/global.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastProvider } from "../providers";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </ApolloProvider>
  );
};

export default App;
