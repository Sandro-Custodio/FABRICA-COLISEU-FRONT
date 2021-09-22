import React from "react"
import Grid from "../../common/layout/grid";

export default props => {
    const { cols, input, label, msgvalidation, data, name } = props;
    return (
        <Grid cols={cols}>
            <div className="form-group">
                {label ? <label>{label}</label> : null}
                <select
                    className="form-control"
                    {...props}
                    {...input}
                >
                    {typeof props.hidedefaultoption === "undefined" && <option
                        value={(typeof props.usenumericnull !== "undefined") && 1000000000}
                    >
                    </option>}
                    {data && data.map(i => (
                        <option key={i.value} value={i.value}>{i.text}</option>
                    ))}
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