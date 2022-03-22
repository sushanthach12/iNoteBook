import { useState } from "react";
import AlertContext from "./Alertcontext";

const AlertState = (props) => {
    const [alert, setAlert] = useState({ show: false, type: "", messege: "" });

    const toggleAlert = (show, type, messege) => {
        setAlert({ show, type, messege });

        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    return (
        <AlertContext.Provider value={{ toggleAlert, alert }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
