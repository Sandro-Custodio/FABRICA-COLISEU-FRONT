const INITIAL_STATE = {
  ot_seg:{
      virtual_attributes: {},
      attributes: {}
  }

}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
      case 'OT_SEG_FETCHED':
              if (!action.payload.ot_seg){
                  return state;
              }
              let virtual_attributes = action.payload.ot_seg.virtual_attributes
              let attributes = action.payload.ot_seg.attributes

          return {...state,virtual_attributes,attributes,}
      default:
          return state;
  }
}
