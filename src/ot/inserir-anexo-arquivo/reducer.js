import moment from "moment";

const INITIAL_STATE = {
  seg_attachs: [],
  rows: [],
  rowsNews: [],
  amount_type_proj: 1,
  linhaSelecionada: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OT_FETCHED_GET_INFO": {
      const rows = action.payload.seg_attachs.map(r => ({
        id: r.id,
        name: r.original_name,
        lastModifiedDate: moment(r.updated_at).format("ddd MMM YYYY"),
        path: r.file_type,
        size: r.file_size,
        type: r.file_type,
        attach_type: r.attach_type,
        repository_name: r.repository_name
      }));


      return {
        ...state,
        seg_attachs: action.payload.seg_attachs,
        amount_type_proj: action.payload.amount_type_proj,
        linhaSelecionada: action.linhaSelecionada,
        rows
      };
    }
    case "RESET":
      return INITIAL_STATE;
    case "RESET_ROWS":
      const { rows, ...outros } = state;
      return {
        ...outros,
        rows: []
      };
    case "ROW_CHANGED": {
      const { rows, rowsNews,  ...outros } = state;
      rows.push({ ...action.payload, new: true });
      rowsNews.push({ ...action.payload, new: true });
      return {
        ...outros,
        rows,
        rowsNews
      };
    }
    case "DELETE": {
      const { rows, seg_attachs, rowsNews, ...outros } = state;
      rows.splice(
        rows.findIndex(s => s.id === action.payload.id),
        1
      );
      rowsNews.splice(
        rowsNews.findIndex(s => s.id === action.payload.id),
        1
      );
      seg_attachs.splice(
        seg_attachs.findIndex(s => s.id === action.payload.id),
        1
      );
      return {
        ...outros,
        rows,
        rowsNews,
        seg_attachs
      };
    }
    default:
      return state;
  }
};
