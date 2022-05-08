import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// components
import SiteHeader from './components/SiteHeader'

// pages
const Homepage = lazy(() => import("./pages/Homepage"));
const ReviewDetails = lazy(() => import("./pages/ReviewDetails"));
const Category = lazy(() => import("./pages/Category"));
const NotFound = lazy(() => import("./pages/NotFound"));

// apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Suspense fallback={<>Loading</>}>
          <div className="App">
            <SiteHeader />
            <Routes>
              <Route path="/" element={<Homepage />} index />
              <Route path="/details/:id" element={<ReviewDetails />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Suspense>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
