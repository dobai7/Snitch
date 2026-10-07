import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import ForgotPassword from "./features/auth/pages/ForgotPassword.jsx"
import ResetPassword from "./features/auth/pages/ResetPassword"
import Verify from "./features/auth/pages/Verify"

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
  },
  {
    path: "/verify",
    element: <Verify/>
  }

])

export default Router