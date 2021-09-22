import React from 'react'
import { Widget } from "common";
import { Link } from "react-router-dom";


const Dashboardfuncional = () => {

    return (
        <div>
            <Link to="/dashboard/rollout"  >
                <Widget
                    icon={"file-text-o"}
                    cols="12 3 3 3"
                    header={"Rollout"}
                    title={"Rollout"}
                />
            </Link>
            <Link to="/dashboard/eficiencia"  >
                <Widget
                    key={"Eficiência"}
                    icon={"file-text-o"}
                    cols="12 3 3 3"
                    header={"Eficiência"}
                    title={"Eficiência"}
                />
            </Link>
        </div>
    )
}

export default Dashboardfuncional
