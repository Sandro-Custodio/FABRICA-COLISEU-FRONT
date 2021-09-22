import React from 'react'
import { useSelector } from "react-redux";
import ContentHeader from "common/adminLTE/contentHeader";
import Overlay from "common/msg/overlay/overlay";
import { useHistory } from "react-router-dom";


function Project() {
    const project = useSelector(state => state.dashboard.project);
    const history = useHistory();

    return (
        <>
            {
                project.name == undefined ? history.push("/") : (<div className="overlay-wrapper">
                    <div className="header" style={{ paddingBottom: "1vw", flexDirection: "column" }}>
                        <ContentHeader title={project.name} />
                    </div>
                    <Overlay />
                </div>)
            }
        </>
    )
}

export default Project
