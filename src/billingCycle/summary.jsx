import React from 'react';

import Grid from '../common/layout/grid'
import ValueBox from '../common/widget/valueBox'

export default ({credit, debt}) => (
    <Grid cols="12">
        <fieldset>
            <legend>Resumo</legend>
            <ValueBox cols="12 4" color="green" icon="bank" value={`R$ ${credit}`} text="Créditos" />
            <ValueBox cols="12 4" color="red" icon="credit-cart" value={`R$ ${debt}`} text="Débitos" />
            <ValueBox cols="12 4" color="blue" icon="money" value={`R$ ${credit - debt}`} text="Consolidado" />
        </fieldset>
    </Grid>
)