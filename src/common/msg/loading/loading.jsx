import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';
import Img from 'react-image'
import { css } from '@emotion/core';
import './styles.css'

const override = css`
    text-align: center;
    display: block;
    margin: 0 auto;
`;

class Loading extends Component{
    render() {
        return (
            <div className="login-box">
                <div className="login-logo-body">
                    <div className="loading">
                        <Img src={require('../../images/tim-logo.png')} />
                    </div>
                    <div className="login-logo">
                        <BarLoader css={override} color="#003366" height="1" width="80" />
                    </div>
                </div>
            </div>
        )
    }
}
export default Loading