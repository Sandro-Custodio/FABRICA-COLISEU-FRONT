import React from 'react'

function FocaisProjeto({pontosFocais}) {
    return (
        <div>
            <div className="col-md-4 col-sm-4 col-xs-12" style={{ width: "300px", marginLeft: "10px", padding: "15px", fontSize: "medium"  }}>
                <div className="box box-default">
                    <div className="box-header with-border" >
                        <h3 className="box-title">Focais do Projeto:</h3>
                    </div>
                    <div className="box-body">
                        <div className="col-md-4" >
                            <ol className="chart-legend clearfix" id="parent" >
                           {pontosFocais && pontosFocais.map((el)=> 
                                <li>
                                   {el}
                                </li>)}  
                            </ol>
                        </div>
                    </div>
                    <div className="box-footer" />
                </div>
            </div>
        </div>
    )
}

export default FocaisProjeto
