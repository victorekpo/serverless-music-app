import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import ErrorPage from './pages/error';
import DashboardPage from '@/pages/dashboard';
import SongPage from "@/pages/song";
import SearchPage from "@/pages/search";
import AddMusicPage from "@/pages/add";
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"
import { Helmet } from "react-helmet";
import './globals.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>, // Login page with its own layout
    errorElement: <ErrorPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>, // Login page with its own layout
    errorElement: <ErrorPage/>,
  },
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <DashboardPage/>,
      },
      {
        path: '/test',
        element: (
          <h1>Testing 1 2 3, API is {process.env.API_URL} </h1>
        ),
      },
      {
        path: '/song/:songId',
        element: <SongPage/>,
      },
      {
        path: '/search',
        element: <SearchPage/>,
      },
      {
        path: '/add',
        element: <AddMusicPage/>,
      }
    ],
  },
]);

// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
  <div className="application">
    <Helmet>
      <meta charSet="utf-8"/>
      <title>Music Collection App</title>
    </Helmet>
    <RouterProvider router={router}/>
  </div>
);
