import {
    SETDOGLIST,
    SETDOGLISTRAW,
    SETDOGLISTXERO,
    SETDOGLISTZETA,
    SETDOGSEARCH,
    SETTEMPERAMENTFILTERLIST,
    SETDOGLISTFILTERED,
    SETDOGLISTFILTERED2,
    SETTEMPERAMENTFILTER,
    SETCREATEDFILTER,
    SETFILTERACTIVE1,
    SETFILTERACTIVE2,
    SETSORTALPHABETIC,
    SETSORTWEIGHT,
    SETRESET,
} from "./actions";

const initialState = {
    dogListRaw: [],
    dogList: [],
    dogListFiltered: [],
    dogListFiltered2: [],
    dogListXero: [],
    dogListZeta: [],

    filterActive1: false,
    temperamentFilterList: [],
    temperamentFilter: "",

    filterActive2: false,
    createdFilter: "all",

    dogSearch: "",

    sortAlphabetic: "",
    sortWeight: "",
    reset: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SETDOGSEARCH: 
            return {
                ...state,
                dogSearch: action.payload
            }
        case SETDOGLIST:
            return {
                ...state,
                dogList: action.payload
            }
        case SETDOGLISTRAW:
            return {
                ...state,
                dogListRaw: action.payload
            }
        case SETDOGLISTXERO:
            return {
                ...state,
                dogListXero: action.payload
            }
        case SETDOGLISTZETA:
            return {
                ...state,
                dogListZeta: action.payload
            }
        case SETTEMPERAMENTFILTERLIST:
            return {
                ...state,
                temperamentFilterList: action.payload
            }
        case SETDOGLISTFILTERED:
            return {
                ...state,
                dogListFiltered: action.payload
                
            }
        case SETDOGLISTFILTERED2:
            return {
                ...state,
                dogListFiltered2: action.payload
                
            }
        case SETTEMPERAMENTFILTER:
            return {
                ...state,
                temperamentFilter: action.payload
            }
        case SETCREATEDFILTER:
            return {
                ...state,
                createdFilter: action.payload
            }
        case SETFILTERACTIVE1:
            return {
                ...state,
                filterActive1: action.payload
            }
        case SETFILTERACTIVE2:
            return {
                ...state,
                filterActive2: action.payload
            }
        case SETSORTALPHABETIC:
            return {
                ...state,
                sortAlphabetic: action.payload
            }
        case SETSORTWEIGHT:
            return {
                ...state,
                sortWeight: action.payload
            }
        case SETRESET:
            return {
                ...state,
                reset: action.payload
            }
        default: 
        return { ...state };
    }
}

export default reducer;