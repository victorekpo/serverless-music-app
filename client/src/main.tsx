import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Error from './pages/Error';
import Home from '@/pages/Home';
import SongPage from "@/pages/Song";
import './globals.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home/>,
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
    ],
  },
]);

// Render your React component instead
// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
