export const SETDOGLIST = "SETDOGLIST";
export const SETDOGLISTRAW = "SETDOGLISTRAW";
export const SETDOGLISTXERO = "SETDOGLISTXERO";
export const SETDOGLISTZETA = "SETDOGLISTZETA";
export const SETDOGSEARCH = "SETDOGSEARCH";
export const SETTEMPERAMENTFILTERLIST = "SETTEMPERAMENTFILTERLIST";
export const SETDOGLISTFILTERED = "SETDOGLISTFILTERED"
export const SETDOGLISTFILTERED2 = "SETDOGLISTFILTERED2"
export const SETTEMPERAMENTFILTER = "SETTEMPERAMENTFILTER";
export const SETCREATEDFILTER = "SETCREATEDFILTER";
export const SETFILTERACTIVE1 = "SETFILTERACTIVE1"
export const SETFILTERACTIVE2 = "SETFILTERACTIVE2"
export const SETSORTALPHABETIC = "SETSORTALPHABETIC"
export const SETSORTWEIGHT = "SETSORTWEIGHT"
export const SETRESET = "SETRESET"

export const setDogSearch = (data) => {
    return { type: SETDOGSEARCH, payload: data};
}
export const setDogList = (data) => {
    return { type: SETDOGLIST, payload: data};
}
export const setDogListRaw = (data) => {
    return { type: SETDOGLISTRAW, payload: data};
}
export const setDogListXero = (data) => {
    return { type: SETDOGLISTXERO, payload: data};
}
export const setDogListZeta = (data) => {
    return { type: SETDOGLISTZETA, payload: data};
}
export const setTemperamentFilterList = (data) => {
    return { type: SETTEMPERAMENTFILTERLIST, payload: data};
}
export const setDogListFiltered = (data) => {
    return { type: SETDOGLISTFILTERED, payload: data};
}
export const setDogListFiltered2 = (data) => {
    return { type: SETDOGLISTFILTERED2, payload: data};
}
export const setTemperamentFilter = (data) => {
    return { type: SETTEMPERAMENTFILTER, payload: data};
}
export const setCreatedFilter = (data) => {
    return { type: SETCREATEDFILTER, payload: data};
}
export const setFilterActive1 = (data) => {
    return { type: SETFILTERACTIVE1, payload: data};
}
export const setFilterActive2 = (data) => {
    return { type: SETFILTERACTIVE2, payload: data};
}
export const setSortAlphabetic = (data) => {
    return { type: SETSORTALPHABETIC, payload: data};
}
export const setSortWeight = (data) => {
    return { type: SETSORTWEIGHT, payload: data};
}
export const setReset = (data) => {
    return { type: SETRESET, payload: data};
}

