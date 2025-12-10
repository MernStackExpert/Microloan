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
import LoanApplication from "../Pages/LoanApplication/LoanApplication";
import PendingLoans from "../Pages/Dashbord/ManagerHome/PendingLoans/PendingLoans";
import ApprovedLoans from "../Pages/Dashbord/ManagerHome/ApprovedLoans/ApprovedLoans";
import ManageUsers from "../Pages/Dashbord/AdminHome/ManageUsers/ManageUsers";
import AdminAllLoans from "../Pages/Dashbord/AdminHome/AdminAllLoans/AdminAllLoans";
import LoanApplications from "../Pages/Dashbord/AdminHome/LoanApplications/LoanApplications";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";
import BorrowerRoute from "./BorrowerRoute";
import PrivateRoute from "./PrivateRoute";
import Payment from "../Pages/Dashbord/Payment/Payment";
import PaymentHistory from "../Pages/Dashbord/UserHome/PaymentHistory/PaymentHistory";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminManagerRoute from "./AdminManagerRoute";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
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
        element: (
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/loan-application",
        element: (
          <PrivateRoute>
            <LoanApplication />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardNavigate />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "manager-home",
        element: (
          <ManagerRoute>
            <ManagerHome />
          </ManagerRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "user-home",
        element: (
          <BorrowerRoute>
            <UserHome />
          </BorrowerRoute>
        ),
      },
      {
        path: "add-loan",
        element: (
          <ManagerRoute>
            <AddLoan />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <ManagerRoute>
            <MangeLoan />
          </ManagerRoute>
        ),
      },
      {
        path: "update-loan/:id",
        element: (
          <AdminManagerRoute>
            <UpdateLoan />
          </AdminManagerRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <ManagerRoute>
            <PendingLoans />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <ManagerRoute>
            <ApprovedLoans />
          </ManagerRoute>
        ),
      },
      {
        path: "my-loans",
        element: (
          <BorrowerRoute>
            <MyLoans />
          </BorrowerRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-loans",
        element: (
          <AdminRoute>
            <AdminAllLoans />
          </AdminRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <AdminRoute>
            <LoanApplications />
          </AdminRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: (
          <BorrowerRoute>
            <PaymentHistory />
          </BorrowerRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
