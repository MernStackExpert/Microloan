import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import AllLoans from "../Pages/AllLoans/AllLoans";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddLoan from "../Pages/Dashbord/AddLOan/AddLoan";
import MangeLoan from "../Pages/Dashbord/ManageLoan.jsx/MangeLoan";
import MyProfile from "../Pages/Dashbord/MyProfile/MyProfile";
import LoanDetails from "../Pages/LoanDetailes/LoanDetails";
import UpdateLoan from "../Pages/Dashbord/UpdateLoan/UpdateLoan";
import ManagerHome from "../Pages/Dashbord/ManagerHome/ManagerHome";
import DashboardNavigate from "../Pages/DashboardNavigate/DashboardNavigate";
import AdminHome from "../Pages/Dashbord/AdminHome/AdminHome";
import UserHome from "../Pages/Dashbord/UserHome/UserHome";
import MyLoans from "../Pages/Dashbord/UserHome/MyLoans/MyLoans";

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
      {
       path: "/loan-details/:id",
       element: <LoanDetails/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardNavigate/>
      },
      {
        path: "manager-home",
        element: <ManagerHome/>
      },
      {
        path: "admin-home",
        element: <AdminHome/>
      },
      {
        path: "user-home",
        element: <UserHome/>
      },
      {
        path: "add-loan",
        element: <AddLoan/>
      },
      {
        path: "manage-loans",
        element: <MangeLoan/>
      },
      {
        path: "profile",
        element: <MyProfile/>
      },
      {
        path: "update-loan/:id",
        element: <UpdateLoan/>
      },
      {
        path: "my-loans",
        element: <MyLoans/>
      }
      
    ],
  },
]);
