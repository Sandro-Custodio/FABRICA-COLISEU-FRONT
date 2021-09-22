import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { getList, showUpdate, remove } from './actions'

class List extends Component{

    componentWillMount(){
        this.props.getList()
    }
    renderRows = () => {
        const list = this.props.list || []
        return list.map(bc => (
            <tr key={bc._id}>       
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <div className="btn-toolbar">
                        <button type="button" className="btn btn-lg btn-md btn-sm btn-xs btn-info" onClick={() => this.props.showUpdate(bc)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-lg btn-md btn-sm btn-xs btn-danger" onClick={() => this.props.remove(bc._id)}>
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    render(){
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className="table-actions">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.billingCycle.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, remove}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(List)