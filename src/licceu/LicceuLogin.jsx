import './licceu.css'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'
import { login, LicceuLogin } from './licceuActions'
import Overlay from '../common/msg/overlay/overlay'
import logo from '../common/images/tim-logo.png'

class Auth extends Component {
  render() {
    const { handleSubmit, submitting, LicceuLogin } = this.props;
    return (
      <div className="login-box fade-in fade-out">
        <div className="login-logo">
          <span className='logo-lg'>
            <img alt="" width="8%" src={logo} />
          </span>
          <b className="title"> TIM</b> BRASIL
        </div>
        <div className="login-box-body box box-radius bg-navy">
          <div className="login-logo">
            <b>LICCEU</b>
          </div>
          <form onSubmit={handleSubmit}>
            <Field component={Input} type="input" name="login" placeholder="LOGIN" icon="user" />
            <Field component={Input} type="password" name="password" placeholder="SENHA" icon='lock' />
            <Row>
              <Grid cols="8"><a href="#/">ESQUECI MINHA SENHA</a></Grid>
              <Grid cols="4">
                <button type="submit" disabled={submitting} className="btn btn-danger btn-block pull-right" onClick={LicceuLogin}>
                  LOGIN
                </button>
              </Grid>
            </Row>
          </form>
          <Overlay />
        </div>
        <Messages />
      </div>
    )
  }
}

Auth = reduxForm({ form: 'authForm' })(Auth)

const mapDispatchToProps = dispatch => bindActionCreators({ login, LicceuLogin }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)
