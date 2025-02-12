import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Roots from "../Roots/Roots";
import Error from "../Pages/Error";
import Home from "../Home/Home";
import AllTouristsSpot from "../Pages/AllTouristsSpot";
import AddTouristsSpot from "../Pages/AddTouristsSpot";
import MyList from "../Pages/MyList";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Profile from "../Pages/Profile";
import UpdateSpot from "../component/UpdateSpot";
import Viewdetails from "../Pages/Viewdetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Countries from "../component/Countries";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots/>,
      errorElement: <Error/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/all-tourists-spot",
            element: <AllTouristsSpot/>,
        },
        {
            path: "/add-tourists-spot",
            element: <PrivateRoute><AddTouristsSpot/></PrivateRoute>
        },
        {
            path: "/my-list",
            element: <PrivateRoute><MyList/></PrivateRoute>
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
            path: "/profile",
            element: <PrivateRoute>
                <Profile/>
            </PrivateRoute>
        },
        {
            path: "/update-spot/:id",
            element: <UpdateSpot/>
        },
        {
            path: "/spots/:id",
            element: <PrivateRoute><Viewdetails/></PrivateRoute>
        },
        {
            path: "/country-spots/:country_name",
            element: <Countries/>
        },
        
      ]
    },
  ]);