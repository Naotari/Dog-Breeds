import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css"
//import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {
    setDogList,
    setDogListRaw,
    setDogListXero,
    setDogListZeta,
    setDogSearch,
    setTemperamentFilterList,
    setDogListFiltered,
    setDogListFiltered2,
    setTemperamentFilter,
    setCreatedFilter,
    setFilterActive1,
    setFilterActive2,
    setSortAlphabetic,
    setSortWeight,
    setReset
} from "../redux/actions"


const Home = (props) => { 
    const {
        dogSearch, setDogSearch,
        dogListRaw, setDogListRaw,
        dogList, setDogList,
        dogListFiltered, setDogListFiltered,
        dogListFiltered2, setDogListFiltered2,
        dogListXero, setDogListXero,
        dogListZeta, setDogListZeta,
        filterActive1, setFilterActive1,
        temperamentFilterList, setTemperamentFilterList,
        temperamentFilter, setTemperamentFilter,
        filterActive2, setFilterActive2,
        createdFilter, setCreatedFilter,
        sortAlphabetic, setSortAlphabetic,
        sortWeight, setSortWeight,
        reset, setReset,
    } = props

    //----------------------------------------Get full list-------------------------------------------
    useEffect(() => {
        const dogArray = []
        axios.get(`/dogs`)
        .then(dogListApi => {
            dogListApi.data.forEach(dog => dogArray.push(
                <div key={dog.name} className="Home_Dog_Box">
                    <h1>{dog.name}</h1>
                    <img src={dog.image} alt="dog not found" width="300px"/>
                    <p>Temperament: {dog.temperament}</p>
                    <p>Weight: {dog.weight === "NaN"?"0 - 0":dog.weight} pounds</p>
                    {dog.created ? <p>Created Breed</p> : <p>Real Breed</p>}
                    <a href={process.env.REACT_APP_CLIENT + "/details/" + dog.id} className="Details_Button">Details</a>
                </div>
            ))
            setDogListRaw(dogArray);
            setDogList(dogArray);
        })
        .catch(error => console.log(error.message));
        //console.log("loads the first time");
    }, [])
    //-----------------------------------------------------------------
    const dogSearchButtonHandler = () => {
        resetHandler();
        let dogArray = [];
        let dogName = dogSearch.toLowerCase()
        dogArray = dogListRaw.filter(dog => {
            let dogNameSearch = dog.props.children[0].props.children.toLowerCase();
            if (dogNameSearch.includes(dogName)) return true;
            return false;
        })
        if(dogArray.length === 0) setDogList([<h1 key="not_found">No breeds found</h1>]);
        else setDogList(dogArray);
        
    console.log("loads in every search");
    }

    const dogSearchHandler = (event) => {setDogSearch(event.target.value)};
    //----------------------------------------Get full list-------------------------------------------
    //-------------------------------------Temperament Filter---------------------------------------------
    useEffect(() => {
        const temperamentsTemp = []
        async function fetchData() {
            const response = await axios.get("/temperaments")
            response.data.forEach(temp => temperamentsTemp.push(<option key={temp.name} >{temp.name}</option>))
            setTemperamentFilterList(temperamentsTemp)
        }
        fetchData();
    }, [])

    //----------------------------------------------------
    useEffect(() => {

        let tempDogsArray = []
        //console.log(dogList);
        //console.log(tempFilter);
        let dogListH1 = false
        tempDogsArray= dogList.filter(dog => {
            console.log(dog);
            if (dog.type === "h1") tempDogsArray = [<h1 key="not_found">No breeds found</h1>]
            else { 
                let tempsArray = []
                if(dog.props.children[2].props.children[1]) {
                    tempsArray = dog.props.children[2].props.children[1].split(", ")
                }
                //console.log(dog.props.children[2].props.children[1])
                console.log(tempsArray);
                if (tempsArray.includes(temperamentFilter))return true
                return false
            }
        })
        if(tempDogsArray.length === 0 && temperamentFilter !== "") tempDogsArray = [<h1 key="not_found">No breeds found</h1>];
        setDogListFiltered(tempDogsArray);
        //console.log(dogListFiltered);
        temperamentFilter === "" ? setFilterActive1(false) : setFilterActive1(true);

    }, [temperamentFilter])
    
    const tempFilterHandler = (event) => {setTemperamentFilter(event.target.value)};
    //----------------------------------Temperament Filter---------------------------------------------
    //----------------------------------Created Filter-------------------------------------------------------
    const CreatedFilterHandler = (event) => {
        if (event.target.value === "all") setCreatedFilter("all")
        else if (event.target.value === "real") setCreatedFilter("real")
        else if (event.target.value === "created") setCreatedFilter("created")
    };

    useEffect(() => {

            if(createdFilter === "real") {
                let dogListTemp = []
                //console.log(dogListFiltered);
                if (dogListFiltered.length === 0) {
                    if(dogList[0].type === "h1") dogListTemp.push(<h1 key="not_found">No breeds found</h1>)
                    else dogListTemp = dogList.filter(dog => dog.props.children[4].props.children === "Real Breed")
                } else if(dogListFiltered[0].type === "h1") {
                    setDogListFiltered2(dogListFiltered)
                } else {
                    dogListTemp = dogListFiltered.filter(dog => dog.props.children[4].props.children === "Real Breed")
                }
                dogListTemp.length === 0 && (dogListTemp = [<h1 key="not_found">No breeds found</h1>]);
                setDogListFiltered2(dogListTemp)
            } else if(createdFilter === "created") {
                let dogListTemp = []
                if (dogListFiltered.length === 0) {
                    if(dogList[0].type === "h1") dogListTemp.push(<h1 key="not_found">No breeds found</h1>)
                    else dogListTemp = dogList.filter(dog => dog.props.children[4].props.children === "Created Breed")
                } else if(dogListFiltered[0].type === "h1") {
                    setDogListFiltered2(dogListFiltered)
                } else {
                    dogListTemp = dogListFiltered.filter(dog => dog.props.children[4].props.children === "Created Breed")
                }
                dogListTemp.length === 0 && (dogListTemp = [<h1 key="not_found">No breeds found</h1>]);
                setDogListFiltered2(dogListTemp)
            } else if(createdFilter === "all") {
                setDogListFiltered2([])
            }
            createdFilter === "all" ? setFilterActive2(false) : setFilterActive2(true);
    }, [createdFilter, dogListFiltered])
    //----------------------------------Created Filter--------------------------------------------------------
    //-------------------------------------------Dog list xero-------------------------------------------
        useEffect(() => {
            if (dogListFiltered2.length > 0) {
                setDogListXero(dogListFiltered2)
            } else if(dogListFiltered.length > 0) {
                setDogListXero(dogListFiltered)
            } else setDogListXero(dogList)
        },[dogListFiltered2, dogListFiltered, dogList, dogListZeta])
    //-------------------------------------------Dog list xero-------------------------------------------
    //----------------------------------------Sort alphabetic---------------------------------------
        const sortAlphabeticHandler = (event) => {setSortAlphabetic(event.target.value)};

        useEffect(() => {
            //setSortWeight("")
            setDogListZeta([])
            if(sortAlphabetic === "") {
                setDogListZeta([])
                console.log("Sin alfa");
                setDogListZeta(dogListXero)
            } else if (sortAlphabetic === "Ascendent") {
                setDogListZeta([])
                setSortWeight("")
                setDogListZeta(dogListXero.sort((itemA, itemB) => {
                    return itemA.key.localeCompare(itemB.key);
                }))
            } else if (sortAlphabetic === "Descendent") {
                setDogListZeta([])
                setSortWeight("")
                setDogListZeta(dogListXero.sort((itemA, itemB) => {
                    return itemB.key.localeCompare(itemA.key);
                }))
            }
        }, [sortAlphabetic, dogListXero])
    //----------------------------------------Sort alphabetic---------------------------------------
    //----------------------------------------Sort weight---------------------------------------
        //const [dogListOmega, setDogListOmega] = useState([])

        const sortWeightHandler = (event) => {setSortWeight(event.target.value)};

        useEffect(() => {
            let ListaPerrosDesordenada = dogListXero
            setDogListZeta([])
            if(sortWeight === "") {
                setDogListZeta([])
                console.log("Sin alfa");
                setDogListZeta(ListaPerrosDesordenada)
            } else if (sortWeight === "Ascendent") {
                setDogListZeta([])
                setSortAlphabetic("")
                setDogListZeta (ListaPerrosDesordenada.sort((itemA, itemB) => {
                    //console.log(itemA.props.children[3].props.children[1].split(" - ")[0]);
                    return (itemA.props.children[3].props.children[1].split(" - ")[0]) - (itemB.props.children[3].props.children[1].split(" - ")[0]);
                }))
            } else if (sortWeight === "Descendent") {
                setDogListZeta([])
                setSortAlphabetic("")
                setDogListZeta (ListaPerrosDesordenada.sort((itemA, itemB) => {
                    return (itemB.props.children[3].props.children[1].split(" - ")[0]) - (itemA.props.children[3].props.children[1].split(" - ")[0]);
                }))
            };
            ListaPerrosDesordenada = []
            console.log(dogListZeta);
        }, [sortWeight, dogListXero])
    //----------------------------------------Sort weight---------------------------------------
    //----------------------------------------Dog list zeta---------------------------------------

    //----------------------------------------Dog list zeta---------------------------------------
    //----------------------------------------Paginado---------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [dogPerPage] = useState(8);

    const indexLastDog = currentPage * dogPerPage;
     const indexFirstDog = indexLastDog - dogPerPage;
     const currentDogs = dogListZeta.slice(indexFirstDog, indexLastDog);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
         const maxPage = Math.ceil(dogListZeta.length / dogPerPage)
         const pages = [];
         for(let i = 1; i <= Math.ceil(dogListZeta.length/dogPerPage); i++){
             pages.push(i);
         }

    //----------------------------------------Paginado---------------------------------------
    //--------------------------------------Reset---------------------------------------------
    
    const resetHandler = () => {
        setReset(true)

        // setDogSearch("");
        // setDogList(dogListRaw);

        setTemperamentFilter("");
        setFilterActive1(false);

        setCreatedFilter("all");
        setFilterActive2(false);


        //setDogListFiltered([]);

        setSortAlphabetic("");
        setSortWeight("");
        
        setReset(false);
        console.log("reset pressed");
    }

    //--------------------------------------Reset---------------------------------------------
    

    return(
        <div className="Home_Main">
            <div className="Home_Second">
                <div className="Home_Search_Params">
                    <div>
                        <label htmlFor="search">Name(Breed):</label>
                        <input type="text" key="search" className="searchBox" onChange={dogSearchHandler} value={dogSearch}></input>
                        <button onClick={dogSearchButtonHandler}>Search</button>
                    </div>
                        <div>
                            Temperament:
                            <select selected="empty" onChange={tempFilterHandler} value={temperamentFilter}>
                                <option key="empty"></option>
                                {temperamentFilterList}
                            </select>
                        </div>
                        <div>
                            <input type="radio" id ="all" name="created_filter" value="all" checked={createdFilter === "all"} onChange={CreatedFilterHandler}></input>
                            <label htmlFor="all">All Breeds</label>

                            <input type="radio" id ="real" name="created_filter" value="real" checked={createdFilter === "real"} onChange={CreatedFilterHandler}></input>
                            <label htmlFor="real">Real Breeds</label>

                            <input type="radio" id ="created" name="created_filter" value="created" checked={createdFilter === "created"} onChange={CreatedFilterHandler}></input>
                            <label htmlFor="created">Created Breeds</label>
                        </div>
                    <div>
                        <div>
                            Alphabetic:
                            <select selected="empty" onChange={sortAlphabeticHandler} value={sortAlphabetic}>
                                <option key="empty"></option>
                                <option key="ascendent">Ascendent</option>
                                <option key="descendent">Descendent</option>
                            </select>
                        </div>
                        <div>
                            Weight:
                            <select selected="empty" onChange={sortWeightHandler} value={sortWeight}>
                                <option key="empty"></option>
                                <option key="ascendent">Ascendent</option>
                                <option key="descendent">Descendent</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={resetHandler}>Reset filters</button>
                </div>



                <div>
                    <div>
                        <select id='pages' defaultValue={0} onChange={(e) => paginate(e.target.value)} >
                            <option value={0} hidden>Go to page</option>
                            {pages?.map(n => 
                            <option key={n} value={n}>{n}</option> 
                            )}
                        </select>
                        <div>
                            <button  onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
                                &laquo; Previous
                            </button>
                                &nbsp;
                            <span>Page {currentPage} of {maxPage} </span>
                                &nbsp;
                            <button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
                                Next &raquo;
                            </button>
                        </div>
                    </div>
                    <div className="Home_Dog_Boxes">
                        {currentDogs}
                    </div>
                </div>
            </div>
        </div>
    )
}


//--------------------------------------receive global state------------------------
const mapStateToProps = (state) => {
    return {
        dogListRaw: state.dogListRaw,
        dogList : state.dogList,
        dogListFiltered: state.dogListFiltered,
        dogListFiltered2: state.dogListFiltered2,
        dogListXero: state.dogListXero,
        dogListZeta: state.dogListZeta,

        filterActive1: state.filterActive1,
        temperamentFilterList: state.temperamentFilterList,
        temperamentFilter: state.temperamentFilter,

        filterActive2: state.filterActive2,
        createdFilter: state.createdFilter,

        dogSearch: state.dogSearch,

        sortAlphabetic: state.sortAlphabetic,
        sortWeight: state.sortWeight,

        reset: state.reset
    }
}
//--------------------------------------receive global state------------------------
//--------------------------------------Make the dispatch functions-------------------
const mapDispatchToProps = (dispatch) => {
    return{
        setDogSearch: (data) => {dispatch(setDogSearch(data))},
        setDogList: (data) => {dispatch(setDogList(data))},
        setDogListRaw: (data) => {dispatch(setDogListRaw(data))},
        setDogListXero: (data) => {dispatch(setDogListXero(data))},
        setDogListZeta: (data) => {dispatch(setDogListZeta(data))},
        setTemperamentFilterList: (data) => {dispatch(setTemperamentFilterList(data))},
        setDogListFiltered: (data) => {dispatch(setDogListFiltered(data))},
        setDogListFiltered2: (data) => {dispatch(setDogListFiltered2(data))},
        setTemperamentFilter: (data) => {dispatch(setTemperamentFilter(data))},
        setCreatedFilter: (data) => {dispatch(setCreatedFilter(data))},
        setFilterActive1: (data) => {dispatch(setFilterActive1(data))},
        setFilterActive2: (data) => {dispatch(setFilterActive2(data))},
        setSortAlphabetic: (data) => {dispatch(setSortAlphabetic(data))},
        setSortWeight: (data) => {dispatch(setSortWeight(data))},
        setReset: (data) => {dispatch(setReset(data))},
    }
}
//--------------------------------------Make the dispatch functions-------------------

export default connect(mapStateToProps, mapDispatchToProps)(Home)