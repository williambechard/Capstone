import '../styles/global.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  AuthorsProvider,
  BooksProvider,
  CategoriesProvider,
  ViewBookProvider,
  ToastProvider
} from '../providers';

import { Layout } from '../components';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  cache: new InMemoryCache()
});

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <ToastProvider>
          <Layout>
            <BooksProvider>
              <CategoriesProvider>
                <AuthorsProvider>
                  <ViewBookProvider>
                    <Component {...pageProps} />
                  </ViewBookProvider>
                </AuthorsProvider>
              </CategoriesProvider>
            </BooksProvider>
          </Layout>
        </ToastProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
