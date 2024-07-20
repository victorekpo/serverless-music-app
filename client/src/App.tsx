import { NextUIProvider } from "@nextui-org/react";
import { Outlet } from 'react-router-dom';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@/components/Context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


const App = () => {
  return (
    <>
      <div className="main-container">
        <div className="main-navbar">
          <Navbar/>
        </div>
        <div><Toaster/></div>
        <div className="page-container">
          <ApolloProvider client={client}>
            <AppContextProvider>
              <NextUIProvider>
                <Outlet/>
              </NextUIProvider>
            </AppContextProvider>
          </ApolloProvider>
        </div>
      </div>
      <div className="footer-container">
        <Footer/>
      </div>
    </>
  );
};

export default App;