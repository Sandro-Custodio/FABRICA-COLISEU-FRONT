import moment from "moment";

const INITIAL_STATE = {
  seg_attachs: [],
  rows: [],
  linhaSelecionada: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ASSINAR_OT_FETCHED_GET_INFO": {
      const rows = action.payload.seg_attachs.map(r => ({
        id: r.id,
        name: r.original_name,
        lastModifiedDate: moment(r.updated_at).format("ddd MMM YYYY"),
        path: r.file_type,
        size: r.file_size,
        attach_type: r.attach_type,
        repository_name: r.repository_name
      }));
      // console.log("!!!!!!!!!!!!!!!!!!!rows", rows);

      return {
        ...state,
        seg_attachs: action.payload.seg_attachs,
        linhaSelecionada: action.linhaSelecionada,
        rows
      };
    }
    case "ASSINAR_RESET":
      return { ...INITIAL_STATE };
    case "ASSINAR_ROW_CHANGED": {
      const { rows, ...outros } = state;
      rows.push({ ...action.payload, new: true });
      return {
        ...outros,
        rows
      };
    }
    case "ASSINAR_DELETE": {
      const { rows, seg_attachs, ...outros } = state;
      rows.splice(rows.findIndex(s => s.id === action.payload.id), 1);
      seg_attachs.splice(
        seg_attachs.findIndex(s => s.id === action.payload.id),
        1
      );
      return {
        ...outros,
        rows,
        seg_attachs
      };
    }
    default:
      return state;
  }
};
