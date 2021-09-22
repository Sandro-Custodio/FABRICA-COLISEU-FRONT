import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { reduxForm, Field } from "redux-form";
import { DropdownListField } from "common/form/components";
import { useSelector } from "react-redux";
import get from "lodash/get";

function Fisico({ físicoProjeto }) {

    const months = [{ id: "janeiro", name: "Jan" }, { id: "fevereiro", name: "Fev" }, { id: "marco", name: "Mar" }, { id: "abril", name: "Abr" }, { id: "maio", name: "Mai" }, { id: "junho", name: "Jun" }, { id: "julho", name: "Jul" }, { id: "agosto", name: "Ago" }, { id: "setembro", name: "Set" }, { id: "outubro", name: "Out" }, { id: "novembro", name: "Nov" }, { id: "dezembro", name: "Dez" }]

    const { month } = useSelector(({ form: { DashboardFisicoMonthFields } }) =>
        get(DashboardFisicoMonthFields, "values", {})
    );
    const [doughnutData, setdoughnutData] = React.useState({
        datasets: [
            {
                data: [1, 1],
                backgroundColor: ["#00a65a", "#3c8dbc"]
            }
        ],
        labels: ["Físico Divulgado Gestão", "Planejado Físico Comite"]
    });
    const [selectedMonth, setSelectedMonth] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [updatedMonth, setUpdatedMonth] = React.useState({});

    React.useEffect(() => {
        let getData = new Date().getMonth();
        //let getData = 0;
        switch (getData) {
            case 0:
                setUpdatedMonth(months[getData])
                break;
            case 1:
                setUpdatedMonth(months[getData])
                break;
            case 2:
                setUpdatedMonth(months[getData])
                break;
            case 3:
                setUpdatedMonth(months[getData])
                break;
            case 4:
                setUpdatedMonth(months[getData])
                break;
            case 5:
                setUpdatedMonth(months[getData])
                break;
            case 6:
                setUpdatedMonth(months[getData])
                break;
            case 7:
                setUpdatedMonth(months[getData])
                break;
            case 8:
                setUpdatedMonth(months[getData])
                break;
            case 9:
                setUpdatedMonth(months[getData])
                break;
            case 10:
                setUpdatedMonth(months[getData])
                break;
            case 11:
                setUpdatedMonth(months[getData])
                break;
            default:
                console.log("Não foi possível achar o mês atual.");

        }

        físicoProjeto != undefined && setdoughnutData({
            datasets: [
                {
                    data: [físicoProjeto[0][updatedMonth.id], físicoProjeto[1][updatedMonth.id]],
                    backgroundColor: ["#00a65a", "#3c8dbc"]
                }
            ],
            labels: ["Físico Divulgado Gestão", "Planejado Físico Comite"]
        });
        setShow(true)
    }, [físicoProjeto]);


    React.useEffect(() => {
        selectedMonth != "" && físicoProjeto != undefined && setdoughnutData({
            datasets: [
                {
                    data: [físicoProjeto[0][selectedMonth], físicoProjeto[1][selectedMonth]],
                    backgroundColor: ["#00a65a", "#3c8dbc"]
                }
            ],
            labels: ["Físico Divulgado Gestão", "Planejado Físico Comite"]
        });
        selectedMonth != "" && setShow(true)

    }, [selectedMonth]);

    React.useEffect(() => {
        month && (setSelectedMonth(month.id))
    }, [month]);

    return (
        <div>
            <div style={{ marginLeft: "50px", width: "500px", fontSize: "medium" }}>
                <div className="box box-default">
                    <div className="box-header with-border" >
                        <h3 className="box-title">Físico</h3>
                    </div>
                    <div>
                        <Field
                            name="month"
                            cols="12 3"
                            component={DropdownListField}
                            data={months}
                            textField={item => item.name}
                            textValue={({ item }) => item.id}
                            placeholder={updatedMonth.name}
                            type="text"
                        />
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="chart-responsive">
                                    <Doughnut
                                        data={doughnutData}
                                        options={{
                                            plugins: {
                                                datalabels: {
                                                    display: true,
                                                    color: 'white'
                                                }
                                            }
                                        }}
                                        width={80}
                                        height={80}
                                        legend={{ display: false }}
                                        datalabels={{
                                            display: true,
                                            color: "black",
                                        }}
                                    />
                                </div>
                            </div>
                            {show && (<div className="col-md-6">
                                <ul className="chart-legend clearfix">
                                    <li style={{ paddingLeft: "10px" }}>
                                        <i className="fa fa-circle-o text-green" />
                                        Físico Divulgado Gestão = {doughnutData.datasets[0].data[0]}

                                    </li>
                                    <li style={{ paddingLeft: "10px" }}>
                                        <i className="fa fa-circle-o text-aqua" />
                                        Planejado Físico Comite = {doughnutData.datasets[0].data[1]}
                                    </li>
                                </ul>
                            </div>)}
                        </div>
                    </div>
                    <div className="box-footer" />
                </div>
            </div>
        </div>
    )
}

const Form = reduxForm({ form: "DashboardFisicoMonthFields" })(Fisico);

export default Form;