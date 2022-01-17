import { Routes as AppRoutes, Route } from "react-router-dom";
import Dashboard from "../Views/Admin/Dashboard/Dashboard";
import Login from "../Views/Admin/Login/Login";
import Home from "../Views/User/Home/Home";

// import AppBody from "../AppBody/AppBody";
// import Settings from "../Settings/Settings";
// import CurrentUserProfile from "../CurrentUserProfile/CurrentUserProfile";
// import SearchedUserProfile from "../SearchedUserProfile/SearchedUserProfile";

const Routes = () => {

    return (
        <AppRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            {/* <Route path="/home" element={<AppBody />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<CurrentUserProfile />} />
            <Route path="/user/:id" element={<SearchedUserProfile />} /> */}
            
        </AppRoutes>
    )
}

export default Routes
