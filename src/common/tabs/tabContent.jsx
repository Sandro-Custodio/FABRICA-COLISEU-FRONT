import React, { Component } from 'react';
import IF from '../operator/if'
import { connect } from 'react-redux'
class TabContent extends Component {
    render() {
        return (
            <IF test={this.props.tab.visible[this.props.id]}>
                <div className={`tab-pane fade-in ${this.props.tab.selected === this.props.id ? 'active' : '' }`} id={this.props.id}>
                    {this.props.children}
                </div>
            </IF>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
export default connect(mapStateToProps)(TabContent)