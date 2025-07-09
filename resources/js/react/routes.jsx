
import { Permissions } from "./constants";
import Users from "./components/users/users";
import EditUser from "./components/users/EditUser";
import CreateUser from "./components/users/CreateUser";
import CreateRole from "./components/roles/CreateRole";
import EditRole from "./components/roles/EditRole";
import Roles from "./components/roles/Roles";
import Dashboard from "./components/dashboard/dashboard";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";

export const routes = [
    {
        path: "dashboard",
        ele: <Dashboard />,
        permission: Permissions.MANAGE_DASHBOARD,
    },
    {
        path: "users",
        ele: <Users />,
        permission: Permissions.MANAGE_USERS,
    },
    {
        path: "users/edit/:id",
        ele: <EditUser />,
        permission: Permissions.MANAGE_USERS,
    },
    {
        path: "users/create",
        ele: <CreateUser />,
        permission: Permissions.MANAGE_USERS,
    },
    {
        path: "roles/create",
        ele: <CreateRole />,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        path: "roles/edit/:id",
        ele: <EditRole />,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        path: "roles",
        ele: <Roles />,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        path: "profile",
        ele: <Profile />,
        permission: Permissions.MANAGE_PROFILE,
    },
    {
        path: "settings",
        ele: <Settings />,
        permission: Permissions.MANAGE_SETTINGS,
    }
];

