import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./header/Header";
import { Tokens } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./sidebar/SideBar";
import Footer from "./footer/Footer";
import { fetchConfig } from "../store/action/configAction";
import asideConfig from "../config/asideConfig";

const MasterLayout = (props) => {
    const {
        children,
        newPermissions,
        frontSetting,
        fetchConfig,
        userPermissions,
        allConfigData,
    } = props;
    const [isMenuCollapse, setIsMenuCollapse] = useState(false);
    const token = localStorage.getItem(Tokens.ADMIN);
    const newRoutes = userPermissions && prepareRoutes(userPermissions);
   
    const menuClick = (e) => {
        setIsMenuCollapse(!isMenuCollapse);
        e.preventDefault();
    };
     



    return (
        <div className="nk-app-root">
            <div className="nk-main ">
                <SideBar 
                    isMenuCollapse={isMenuCollapse}
                    menuClick={menuClick}   
                    asideConfig={newRoutes}
                />
                 
                <div className="nk-wrap ">
                    <Header 
                        menuClick={menuClick}   
                    />
                    <div className="nk-content ">
                        <div className="container-fluid">
                            <div className="nk-content-inner">
                                <div className="nk-content-body">
                                        <div className="container-fluid">{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

                <div
                    className={`${
                        isMenuCollapse === true && "nk-sidebar-overlay"
                    }`}
                    onClick={menuClick}
                />
                
            </div>
        </div>
    );
};




const getRouteWithSubMenu = (route, permissions) => {
    const subRoutes = route.subMenu
        ? route.subMenu.filter(
              (item) =>
                  permissions.indexOf(item.permission) !== -1 ||
                  item.permission === ""
          )
        : null;
    const newSubRoutes = subRoutes ? { ...route, newRoute: subRoutes } : route;
    return newSubRoutes;
};

const prepareRoutes = (config) => {
    const permissions = config;
    let filterRoutes = [];
    asideConfig.forEach((route) => {
        const permissionsRoute = getRouteWithSubMenu(route, permissions);
        if ( (permissions && permissions.indexOf(route.permission) !== -1) ||  route.permission === ""   ) {
            filterRoutes.push(permissionsRoute);
        }
    });
    return filterRoutes;
};

const mapStateToProps = (state) => {
    const newPermissions = [];
    const { permissions, settings, frontSetting, userPermissions, allConfigData } =
        state;

    if (permissions) {
        permissions.forEach((permission) =>
            newPermissions.push(permission.attributes.name)
        );
    }
    return { newPermissions, settings, frontSetting, userPermissions, allConfigData };
};

export default connect(mapStateToProps, { fetchConfig })(MasterLayout);


