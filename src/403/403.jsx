import React from 'react'
import './style.scss'
import Content from '../common/adminLTE/content'

export default props => (
  <Content>
    <div className="container">
      <div className="forbidden-sign"></div>
      <h1 className="label label-danger">O acesso a esta página é restrito.</h1>
      <p>Certifique-se de ter permissões suficientes para acessar esta funcionalidade.</p>
    </div>
  </Content>
)
