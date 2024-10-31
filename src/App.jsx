// import { react,useState } from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import AppLayout from './layouts/app-layout';
// import LandingPage from './pages/LandingPage';
// import AdminDashboard from './pages/AdminDashboard';
// import Auth from './pages/Auth';
// import DoctorList from './pages/DoctorList';
// import Departement from './pages/Departement';
// import AppoitmentBooking from './pages/AppoitmentBooking';
// import LiveQueue from './pages/LiveQueue';
// import UrlProvider from './context';
// import RequireAuth from './components/require_auth';
// const router = createBrowserRouter([
//   {
//     element: <AppLayout  />,
//     children: [
//       {
//         path: '/',
//         element: <LandingPage />,
//       },
//       {
//         path: '/admindashboard',
//         element: (
//         <RequireAuth>
//           <AdminDashboard />
//           </RequireAuth>
//         ),
//       },
//       {
//         path: '/auth',
//         element: <Auth />,
//       },
//       {
//         path: '/doctorlist',
//         element: <DoctorList />,
//       },
//       {
//         path: '/department',
//         element: <Departement />,
//       },
//       {
//         path: '/appoitment',
//         element: <AppoitmentBooking />,
//       },
//       {
//         path: '/livequeue',
//         element: <LiveQueue />,
//       },
//     ],
//   },
// ]);

// function App() {

//   return (

//      <UrlProvider>
//      <RouterProvider router={router} />
//      </UrlProvider>

//   )
// }

// export default App
import { react, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import DoctorList from "./pages/DoctorList";
import Departement from "./pages/Departement";
import AppointmentBooking from "./pages/AppointmentBooking";
import LiveQueue from "./pages/LiveQueue";
import UrlProvider from "./context";
import RequireAuth from "./components/require_auth";
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      // {
      //   path: '/doctorlist',
      //   element: <DoctorList />,
      // },
      {
        path: "/doctorlist/:departmentId",
        element: <DoctorList />,
      },
      {
        path: "/department",
        element: <Departement />,
      },
      // {
      //   path: '/appoitment',
      //   element: <AppoitmentBooking />,
      // },
      {
        path: "/appointment-confirmation",
        element: <AppointmentBooking />,
      },
      {
        path: "/livequeue",
        element: <LiveQueue />,
      },
    ],
  },
  {
    path: "/admindashboard",
    element: (
      <RequireAuth>
        <AdminDashboard />
      </RequireAuth>
    ),
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </UrlProvider>
  );
}

export default App;
