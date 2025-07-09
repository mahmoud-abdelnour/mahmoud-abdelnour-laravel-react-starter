import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { Tokens } from "./constants";
import { ProtectedRoute } from "./shared/sharedMethod";
import { routes } from "./routes";
import TopProgressBar from "./shared/components/loaders/TopProgressBar";
import { useSelector } from "react-redux";

function AdminApp(props) {
    const { permissions } = props;
    const token = localStorage.getItem(Tokens.ADMIN);

    const prepareRoutes = (perm) => {
        const permissions = perm;
        let filterRoutes = [];
        routes.forEach((route) => {
            if ( (permissions && permissions.indexOf(route.permission) !== -1) || route.permission === "" ) {
                filterRoutes.push(route);
            }
        });
        return filterRoutes;
    };

    

    if (permissions.length === 0 && token !== null) {
        return <TopProgressBar />;
    }


    const admin_routes = permissions && prepareRoutes(permissions);


    return (
        <Routes>
            {admin_routes.map((route, index) => {
                return route.ele ? (
                    <Route
                        key={index}
                        exact={true}
                        path={route.path}
                        element={
                            token !== null ? (
                                <ProtectedRoute
                                 
                                    route={route.path}
                                >
                                    {route.ele}
                                </ProtectedRoute>
                            ) : (
                                <Navigate replace to={"/login"} />
                            )
                        }
                    />
                ) : null;
            })}
            
            <Route path="*" element={<Navigate replace to={"/"} />} />
        </Routes>
    );
}

export default AdminApp;
