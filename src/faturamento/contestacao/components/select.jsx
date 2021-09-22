import React from "react"
import Grid from "../../../common/layout/grid";

export default props => {
    const { cols, input, label, msgvalidation, data, name } = props;
    let k = 0;
    return (
        <Grid cols={cols}>
            <div className="form-group">
                {label ? <label>{label}</label> : null}
                <select
                    className="form-control"
                    {...props}
                    {...input}
                >
                    {typeof props.hidedefaultoption === "undefined" && <option key="1" value={(typeof props.usenumericnull !== "undefined") && 1000000000}>{label}</option>}                    
                    {data && data.map(i => {
                        k++;
                        return <option key={k} value={i.value}>{i.text}</option>;
                    })}
                </select>
            </div>
            {msgvalidation !== "" && msgvalidation !== undefined ? (
                <div className="form-group">
                    <span className="label label-danger">{msgvalidation}</span>
                </div>
            ) : null}
        </Grid>
    );
}