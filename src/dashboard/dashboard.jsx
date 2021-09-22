import React from 'react'
import ContentHeader from '../common/adminLTE/contentHeader'
import Content from '../common/adminLTE/content'
import Grafico from './dashboard-funcional'
import Row from '../common/layout/row'

function dashboard() {
  return (
    <div className="fade-in fade-out">
      <ContentHeader title="Dashboard" small="Versão 2.0" />
      <Content>
        <Row>
          <Grafico />
        </Row>
      </Content>
    </div>
  )
}

export default dashboard
