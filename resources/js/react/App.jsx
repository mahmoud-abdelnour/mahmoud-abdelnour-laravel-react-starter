import React, { useEffect, useState } from "react";
import { Route, useLocation, Navigate, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/login";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfig } from "./store/action/configAction";
import { IntlProvider } from "react-intl";
import { getFiles } from "./locales/index";
import { settingsKey, Tokens } from "./constants";
import { ToastContainer, toast } from 'react-toastify';
import { getFormattedMessage ,addRTLSupport} from './shared/sharedMethod';
import Cookies from "js-cookie";
import AdminApp from "./AdminApp";


function App() {
  
    const [messages, setMessages] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allLocales, setAllLocales] = useState({});
    const updateLanguage  = useSelector((state) => state.updateLanguage);
    const userPermissions  = useSelector((state) => state.userPermissions);
    const [redirectTo] = useState("/admin/dashboard");
    const token = Cookies.get("authToken");
    const storedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE);

    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFiles(); 
            setAllLocales(data); 
        };
        fetchData();
    }, [updateLanguage]);


    useEffect(() => {
        const currentLanguage = allLocales[updateLanguage ? updateLanguage : 'en'];
        if (  currentLanguage === undefined || currentLanguage === null || currentLanguage === "" ) {
            const defaultUpdateLanguage = allLocales["en"];
            setMessages(defaultUpdateLanguage);
        } else {
            setMessages(currentLanguage);
        }
    }, [allLocales]);



    useEffect(() => {
        addRTLSupport(updateLanguage);
    }, [updateLanguage]);


    useEffect(() => {
        selectCSS();
    }, [location.pathname]);

    const selectCSS = () => {
        const id = 'dynamic-direction-style';
        const existing = document.getElementById(id);
        if (existing) {
            existing.remove();
        }

        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        
        
        if (storedLanguage === "ar") {
            link.href = './css/dashboard-rtl.css';
        }else{
            link.href = './css/dashboard.css';
        }
        document.head.appendChild(link);
    }; 


    useEffect(() => {
        if (token) {
            dispatch(fetchConfig());
        }else{  
            navigate("/login");
        }

        document.getElementById('root').style.display = 'block';

    }, []);


    const IntlErrorFunction = () =>{
       
    }
    

    return (
        <>
            <IntlProvider
                locale={settingsKey.DEFAULT_LOCALE}
                onError={IntlErrorFunction}
                messages={messages}
            >
               
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route  path="admin/*" element={<AdminApp permissions={userPermissions} />}  />
                    <Route
                        path="/"
                        element={
                            <Navigate
                                replace
                                to={token ? redirectTo : "/login"}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate replace to={"/"} />} />
                </Routes>
                
                <ToastContainer />

            </IntlProvider>
        </>
    );
}

export default App;
