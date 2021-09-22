import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

const Intelig = props => {

    const {
        reducer: {
            intelig_overlay,
            intelig,
        },
    } = props

    const openIntelig = intelig => {
        const win = window.open(process.env.REACT_APP_API_URL + "/forms_contratacao/" + intelig, '_blank');
        win.focus();
    }

    return (
        <div className="table-responsive">
            {intelig_overlay && <div className="intelig-overlay">
                <i className="fa fa-refresh fa-spin" />
            </div>}
            <table className="table table-hover table-stripped">
                <colgroup>
                    <col width="80%" />
                    <col width="20%" />
                </colgroup>
                <tbody>
                    {intelig.map(i => (
                        <tr>
                            <td>{i}</td>
                            <td style={{ textAlign: "center" }}>
                                <a
                                    className="btn btn-sm btn-primary"
                                    onClick={() => openIntelig(i)}
                                >
                                    <i className="fa fa-search" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    reducer: state.sdFormReducer,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Intelig)