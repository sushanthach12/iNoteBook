import React, { useContext } from 'react'
import alertContext from '../Context/alert/Alertcontext';


const Alert = () => {
    const context = useContext(alertContext)
    const { alert } = context;
    return (
        <div style={{ height: '50px' }}>
            {(alert.show) && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.messege}
            </div>}
        </div>
    )

}

export default Alert