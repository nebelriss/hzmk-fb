import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FirebaseContextProvider } from './context/firebase.context';
import './index.css';
import { EventPage } from './pages/Event';
import { LoginPage } from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { ProtectedEventRout } from './routes/ProtectedEventRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedEventRout>
        <EventPage />
      </ProtectedEventRout>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <RouterProvider router={router} />
    </FirebaseContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
