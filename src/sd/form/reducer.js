const initialData = {
    formData: {
        action: "new",
        data: {
            vendor: {
                id: undefined,
            }
        },
        circ: [],
    },
    vendor_form: {
        forms: [],
        operator: {},
        vendor: {},
    },
    contract: {},
    sd_user: {},
    od_user: {},
    sd_files: [],
    contracts: [],
    vendor_contacts: [],
    file_overlay: false,
    vendor_overlay: false,
    intelig_overlay: false,
    circs_overlay: false,
    updated_vendor: {},
    intelig: [],
    circuitos: [],
};

export default (state = initialData, action) => {
    switch (action.type) {
        case "SET_FORM_DATA":
            return {...state, formData: action.payload };
        case "SET_CONTRACT":
            return {...state, contract: action.payload };
        case "SET_SD_USER":
            return {...state, sd_user: action.payload };
        case "SET_OD_USER":
            return {...state, od_user: action.payload };
        case "GET_FILES_BY_SD":
            return {...state, sd_files: action.payload };
        case "GET_ALL_DATA_PROVIDER":
            return {...state, ...action.payload };

        case "ADD_NEW_CONTACT":
            {
                let contacts = [...state.vendor_contacts];
                contacts.push(action.payload);
                return {...state, vendor_contacts: contacts };
            }

        case "SET_CONTACTS":
            return {...state, vendor_contacts: action.payload };

        case "SET_VENDOR":
            return {...state, updated_vendor: action.payload };

        case "SET_INTELIG":
            return {...state, intelig: action.payload };

        case "GET_OT_SEGMENTATIONS":
            return {...state, circuitos: action.payload };

        case "SET_VENDOR_FORM":
            return {...state, vendor_form: action.payload };

        case "UPDATE_VENDOR_FORM":
            return {...state, vendor_form: {...state.vendor_form, forms: action.payload } };

        case "SHOW_FILE_OVERLAY":
            return {...state, file_overlay: true };
        case "HIDE_FILE_OVERLAY":
            return {...state, file_overlay: false };
        case "SHOW_VENDOR_OVERLAY":
            return {...state, vendor_overlay: true };
        case "HIDE_VENDOR_OVERLAY":
            return {...state, vendor_overlay: false };
        case "SHOW_INTELIG_OVERLAY":
            return {...state, intelig_overlay: true };
        case "HIDE_INTELIG_OVERLAY":
            return {...state, intelig_overlay: false };
        case "SHOW_CIRCS_OVERLAY":
            return {...state, circs_overlay: true };
        case "HIDE_CIRCS_OVERLAY":
            return {...state, circs_overlay: false };
        default:
            return state;
    }
}