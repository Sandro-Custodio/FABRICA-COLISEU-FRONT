import React from 'react'
import { useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import ContentHeader from "common/adminLTE/contentHeader";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import IconButton from "common/iconButton";
import { DropdownListField } from "common/form/components";

function Header({ title, handleFilter }) {

    const [yearsToverify, setYears] = React.useState([{}]);
    const year = useSelector(state => state.dashboard.yearChoosed);


    const getYears = () => {
        var years = []
        var currentYearplusOne = new Date().getFullYear() + 1;
        var currentYear = new Date().getFullYear();
        var lastYear = new Date().getFullYear() - 1;
        var twoYearAgo = new Date().getFullYear() - 2;
        years.push(currentYearplusOne)
        years.push(currentYear)
        years.push(lastYear)
        years.push(twoYearAgo)
        setYears(years)
    }

    React.useEffect(() => {
        getYears()
        if(year === "Selecione") {
            handleFilter();
        }
    }, []);    

    return (
        <div className="overlay-wrapper">
            <div className="header" style={{ paddingBottom: "1vw" }}>
                <ContentHeader title={title} />
            </div>
            <form>

                <div className="body" style={{ dislay: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Grid cols="12">
                        <Row>
                            <Field
                                name="year"
                                cols="12 2"
                                component={DropdownListField}
                                data={yearsToverify}
                                textField={item => item}
                                textValue={({ item }) => item}
                                placeholder={year}
                                type="text"
                            />
                            <IconButton
                                icon="search"
                                title="Filtrar"
                                onClick={handleFilter}
                            />
                        </Row>
                    </Grid>
                </div>
            </form>
            <Overlay />
        </div>
    )
}

const Form = reduxForm({ form: "DashboardFields" })(Header);

export default Form;

