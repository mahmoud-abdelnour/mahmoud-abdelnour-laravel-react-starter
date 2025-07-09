import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
    faPieChart,
    faSearch,
    faBars
} from "@fortawesome/free-solid-svg-icons";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import { Link, useLocation, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { Tokens } from "../../constants";   

const SideBar = (props) => {
  
    const {
        asideConfig,
        frontSetting,
        menuClick,
        isMenuCollapse,
    } = props;

    const [activeItem, setActiveItem] = useState('dashboard'); // Manage active state
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const intl = useIntl();
    const { id } = useParams();


    const handleItemClick = (e,id) => {
        setActiveItem(id);
        setIsSubmenuOpen(true);
        e.preventDefault();
    };

    const filteredMenu = asideConfig;
    

    return (
   

        <div 
            className={`nk-sidebar nk-sidebar-fixed is-dark nk-sidebar-mobile   ${ isMenuCollapse === true ? "nk-sidebar-active" : "" }   `}
            data-content="sidebarMenu">
            <div className="nk-sidebar-element nk-sidebar-head">
                <div className="nk-menu-trigger">
                    <a  className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"
                    onClick={(e) => menuClick(e)}
                    >
                        <em className="icon ni ni-arrow-left"></em>
                    </a>
                  
                </div>
                <div className="nk-sidebar-brand">
                    <Link to={'/dashboard'} className="logo-link nk-sidebar-logo">
                            <img className="logo-light logo-img" src="images/dashboard-logo.png" alt="logo" />
                    </Link>
                </div>
            </div>

            <div className="nk-sidebar-element nk-sidebar-body">
                <div className="nk-sidebar-content">
                    <div className="nk-sidebar-menu" data-simplebar>
                        <Menu>
                            {filteredMenu.length ? (
                                    filteredMenu.map((mainItems, index) => {
                                        return mainItems.newRoute ? (
                                            <SubMenu
                                                key={index}
                                                label={intl.formatMessage({
                                                    id: `${mainItems.title}`,
                                                })}
                                            
                                                icon={mainItems.fontIcon}
                                            >
                                                {mainItems.newRoute.map(
                                                    (subMainItems, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                icon={
                                                                    subMainItems.fontIcon
                                                                }
                                                             
                                                                active={  location.pathname === subMainItems.to  }
                                                                component={<Link to={subMainItems.to} />}
                                                            >
                                                                    {intl.formatMessage(
                                                                        {
                                                                            id: `${subMainItems.title}`,
                                                                        }
                                                                    )}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </SubMenu>
                                        ) : (
                                            <MenuItem
                                                key={index}
                                                icon={mainItems.fontIcon}
                                            
                                                active={ location.pathname === mainItems.to  }
                                                component={<Link to={mainItems.to} />}
                                            >
                                                {intl.formatMessage({
                                                    id: `${mainItems.title}`,
                                                })}
                                            </MenuItem>
                                        );
                                })
                            ) : (
                                    <div className="text-center">
                                        {getFormattedMessage("side-menu.empty.message")}
                                    </div>
                            )}

                        </Menu>
                    </div>
                </div>
            </div>
          
        </div>
          
     


    );
};


export default  SideBar;
