import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

const ExportConfig = props => {

    const {
        gridModelItems,
        setGridModelItems,
        exportModel,
        userId
    } = props

    const [important, set_important] = React.useState(false)

    React.useEffect(_ => {}, [])

    const select_export = (e, id) => {
        const tr = window.$("#tr-export-" + id)
        if (!e.ctrlKey) {
            window.$("tr.tr-export-model.selected").removeClass("selected")
        }
        if (tr.hasClass("selected")) {
            tr.removeClass("selected")
        }
        else {
            tr.addClass("selected")
        }
    }

    const select_grid = (e, id) => {
        const tr = window.$("#tr-grid-" + id)
        if (!e.ctrlKey) {
            window.$("tr.tr-grid-model.selected").removeClass("selected")
        }
        if (tr.hasClass("selected")) {
            tr.removeClass("selected")
        }
        else {
            tr.addClass("selected")
        }
    }

    const in_arr = (id, array) => {
        let _in = false
        let arr = array.filter((e) => e != null)
        for (let i = 0; i < arr.length; i++)
            if (arr[i].id == id)
                _in = true
        return _in
    }

    const get_export_item = id => {
        let item = {}
        exportModel.map(i => {
            if (i.id == id)
                item = i
        })
        return item
    }

    const add_one = () => {

        const selected_exports = window.$(".tr-export-model.selected")
        let new_items = []

        selected_exports.map(i => {
            const selected = window.$(selected_exports[i])
            const id = selected.data("id")
            const s = get_export_item(id)
            if (in_arr(id, gridModelItems) || s.column_is_required)
                return
            else
                new_items = [...new_items, { ...s, user_id: userId }]
        })

        let arr = []
        if (!important) {
            set_important(true)
            exportModel.map(i => {
                if (i.column_is_required && !in_arr(i.id, gridModelItems))
                    arr.push(i)
            })
        }

        setGridModelItems([...arr, ...gridModelItems, ...new_items])
    }

    const add_all = () => {
        const items = exportModel.map(i => ({ ...i, user_id: userId }))
        setGridModelItems([...items])
    }

    const remove_one = () => {

        const selecteds = window.$(".tr-grid-model.selected")

        let items = []
        let new_items = []
        let state = [...gridModelItems]

        selecteds.map(i => {
            const s = window.$(selecteds[i])
            items.push(get_export_item(s.data("id")))
        })

        items.map(i => {
            if (i.column_is_required)
                return
            state = state.filter(e => e != null)
            for (let f = 0; f < state.length; f++)
                if (i.id == state[f].id)
                    delete state[f]
        })

        new_items = state.filter(e => e != null)

        let arr = []
        exportModel.map(i => {
            if (i.column_is_required && !in_arr(i.id, gridModelItems))
                arr.push(i)
        })

        setGridModelItems([...new_items, ...arr])
    }

    const remove_all = () => {
        let arr = []
        exportModel.map(i => {
            if (i.column_is_required)
                arr.push(i)
        })
        setGridModelItems([...arr])
    }

    return (
        <div className="row">
            <div className="col-md-5 grid-col">
                <table className="table table-hover table-stripped grid-model">
                    <thead>
                        <tr>
                            <th>Campos para Exportação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exportModel.map(i => (
                            <tr
                                key={`tr-export-${i.id}`}
                                id={`tr-export-${i.id}`}
                                data-id={i.id}
                                onClick={e => select_export(e, i.id)}
                                className="tr-export-model"
                            >
                                <td>
                                    <div>
                                        <p className={`${i.column_is_required && "required"}`}>{i.export_label}</p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-md-2">
                <div className="export-actions">
                    <div>
                        <a
                            className="btn btn-success btn-action-export"
                            onClick={() => add_one()}
                        >
                            <i className="fa fa-step-forward"></i>
                        </a>
                    </div>
                    <div>
                        <a
                            className="btn btn-success btn-action-export"
                            onClick={() => add_all()}
                        >
                            <i className="fa fa-fast-forward"></i>
                        </a>
                    </div>
                    <div>
                        <a
                            className="btn btn-success btn-action-export"
                            onClick={() => remove_all()}
                        >
                            <i className="fa fa-fast-backward"></i>
                        </a>
                    </div>
                    <div>
                        <a
                            className="btn btn-success btn-action-export"
                            onClick={() => remove_one()}
                        >
                            <i className="fa fa-step-backward"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-md-5 grid-col">
                <table className="table table-hover table-stripped grid-model">
                    <thead>
                        <tr>
                            <th>Campos Selecionados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gridModelItems.map(i => (
                            <tr
                                key={`tr-grid-${i.id}`}
                                id={`tr-grid-${i.id}`}
                                data-id={i.id}
                                onClick={e => select_grid(e, i.id)}
                                className="tr-grid-model"
                            >
                                <td>
                                    <div>
                                        <p className={`${i.column_is_required && "required"}`}>{i.export_label}</p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExportConfig)