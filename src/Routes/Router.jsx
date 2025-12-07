import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import AllLoans from "../Pages/AllLoans/AllLoans";
import DashboardLayout from "../Layouts/DashboardLayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-loans",
        element: <AllLoans />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // children: [
    //   // Admin Routes
    //   { path: "manage-users", element: <ManageUsers /> },
    //   { path: "all-loans", element: <AllLoansAdmin /> }, // Admin version

    //   // Manager Routes
    //   { path: "add-loan", element: <AddLoan /> },
    //   { path: "manage-loans", element: <ManageLoans /> },
    //   { path: "pending-loans", element: <PendingLoans /> },

    //   // Borrower Routes
    //   { path: "my-loans", element: <MyLoans /> },
    //   { path: "profile", element: <Profile /> },
    // ],
  },
]);
