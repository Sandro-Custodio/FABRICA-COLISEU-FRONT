import React from 'react'
import Code403 from '../../403/403'

class Permission extends React.Component{
    render() {
        if (this.props.check) {
            return (
                this.props.children
            )
        } else {
            return (
                <Code403></Code403>
            )
        }
    }
}

export default Permission;
