import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import ForgotPassword from "./features/auth/pages/ForgotPassword"
import ResetPassword from "./features/auth/pages/ResetPassword"

const Router = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello</h1>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
  }

])

export default Router