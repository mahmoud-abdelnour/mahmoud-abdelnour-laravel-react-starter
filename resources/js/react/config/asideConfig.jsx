import React from "react";
import { Permissions } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPieChart,
    faUser,
    faTruck,
    faUserGroup,
    faHome,
    faBoxes,
    faPrint,
    faBookmark,
    faBoxOpen,
    faMoneyCheckDollar,
    faMoneyBills,
    faQuoteRight,
    faDollarSign,
    faReceipt,
    faArrowRight,
    faArrowLeft,
    faEnvelope,
    faCartShopping,
    faChartColumn,
    faGear,
    faMapLocation,
    faBasketShopping,
    faSms,
    faCube,
    faFile,
    faRulerHorizontal,
    faLanguage,
    faShieldHalved,
    faLayerGroup,

    faPlusCircle,
    faUserShield,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { getFormattedMessage } from "../shared/sharedMethod";

export default [

    {
        title: "Dashboard",
        name: "Dashboard",
        fontIcon: <FontAwesomeIcon icon={faPieChart} />,
        to: "/admin/dashboard",
        class: "d-flex",
        permission: Permissions.MANAGE_DASHBOARD,
        items: [
            {
                title: getFormattedMessage("dashboard.title"),
                to: "/admin/dashboard",
            },
        ],
    },
  

    {
        title: ("Users"),
        name:  ("Users"),
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/admin/users",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_USERS || Permissions.MANAGE_USERS,
        subMenu: [
            {
                title: "Users",
                name: "Users",
                fontIcon: <FontAwesomeIcon icon={faUser} />,
                to: "/admin/users",
                class: "d-flex",
                permission: Permissions.MANAGE_USERS,
            },
            {
                title:"Add User",
                name: "Add User",
                fontIcon: <FontAwesomeIcon icon={faUserPlus} />,
                to: "/admin/users/create",
                class: "d-flex",
                permission: Permissions.MANAGE_USERS,
            },
        ],
    },

    {
        title: "Roles",
        name: "Roles",
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/admin/roles",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_ROLES,
        subMenu: [
            {
                title: "Roles",
                name: "Roles",
                fontIcon: <FontAwesomeIcon icon={faUserShield} />,
                to: "/admin/roles",
                class: "d-flex",
                permission: Permissions.MANAGE_ROLES,
            },
            {
                title:"Add Role",
                name: "Add Role",
                fontIcon: <FontAwesomeIcon icon={faPlusCircle} />,
                to: "/admin/roles/create",
                class: "d-flex",
                permission: Permissions.MANAGE_ROLES,
            },
        ],
    },
];
