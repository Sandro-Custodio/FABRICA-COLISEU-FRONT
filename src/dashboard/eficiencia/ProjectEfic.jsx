import React from 'react'
import { useSelector, useDispatch, connect } from "react-redux";
import ContentHeader from "common/adminLTE/contentHeader";
import Overlay from "common/msg/overlay/overlay";
import { useHistory } from "react-router-dom";
import CommonProjectsTables from "./CommonProjectsTables";
import { getProjectInfo } from "../actions";



function Project() {
    const project = useSelector(state => state.dashboard.project);
    const year = useSelector(state => state.dashboard.yearChoosed);
    const area = useSelector(state => state.dashboard.titleCurrent);
    const [acoesOfensoras, setAcoesOfensoras] = React.useState({});
    const [projectDetails, setProjectDetails] = React.useState({});


    const history = useHistory();
    const dispatch = useDispatch()


    React.useEffect(() => {
        if (project.name != undefined) {
            dispatch([{ type: "SHOW_OVERLAY" }]);
            (async () => {
                await (getProjectInfo(project.name, area, year)).then(res => {
                    setAcoesOfensoras(res[0])
                    setProjectDetails(res[1])
                })
                .catch(err => console.log(err.response))
                .finally(() => {
                    dispatch([{ type: "HIDE_OVERLAY" }]);
                });
            }
            )();
        }
    }, [project]);

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            {
                project.name == undefined ? history.push("/") : (
                    <div className="overlay-wrapper">
                        <div className="header" style={{ paddingBottom: "1vw", flexDirection: "column" }}>
                            <ContentHeader title={project.name} />
                            <CommonProjectsTables title={project.name} area={area} acoesOfensoras={acoesOfensoras} projectDetails={projectDetails} />
                        </div>
                        <Overlay />
                    </div>
                )
            }
        </>
    )
}

export default Project;