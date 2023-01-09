import React from "react";
import "./Creation.css"
//import {Link} from "react-router-dom"
import { useState, useEffect} from "react";
import axios from "axios";

const Creation = (props) => {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [heightMax, setHeightMax] = useState("0");
    const [heightMin, setHeightMin] = useState("0");
    const [weightMax, setWeightMax] = useState("0");
    const [weightMin, setWeightMin] = useState("0");
    const [yearsMax, setYearMax] = useState("0");
    const [yearsMin, setYearMin] = useState("0");
    const [tempInput, setTempInput] = useState("");
    const [tempList, setTempList] = useState([])
    const [owner, setOwner] = useState("")
    const [temperament, setTemperament] = useState("")
    const [isPending, setIsPending] = useState(false);
    
    const nameChangeHandler = (event) => {setName(event.target.value)};
    const imageChangeHandler = (event) => {setImage(event.target.value)};
    const heightMaxChangeHandler = (event) => {setHeightMax(event.target.value)};
    const heightMinChangeHandler = (event) => {setHeightMin(event.target.value)};
    const weightMaxChangeHandler = (event) => {setWeightMax(event.target.value)};
    const weightMinChangeHandler = (event) => {setWeightMin(event.target.value)};
    const yearsMaxChangeHandler = (event) => {setYearMax(event.target.value)};
    const yearsMinChangeHandler = (event) => {setYearMin(event.target.value)};
    const tempInputChangeHandler = (event) => {setTempInput(event.target.value)};
    const ownerChangeHandler = (event) => {setOwner(event.target.value)};
    
    //-----------------------------------------------------Temperament CheckList---------------------------------
    useEffect(() => {
        const temperamentsTemp = []
        async function fetchData() {
            const response = await axios.get("/temperaments")
            response.data.forEach(temp => temperamentsTemp.push(
                <div className="Temp_Box" key={temp.name}>
                    <input type="checkbox" id={"temperamentCheckbox" + temp.name} value={temp.name} onChange={addTempCheckBox}/>
                    <label htmlFor={"temperamentCheckbox" + temp.name}>{temp.name}</label>
                </div>
            ))
            setTempList(temperamentsTemp)
        }
        fetchData();
    }, [temperament])
    //-----------------------------------------------------Temperament CheckList---------------------------------
    //-----------------------------------------------------Adition of a new temperament from Input---------------------------------
    const addTempBox = (event) => {
        let TemperamentList = []
        event.preventDefault()
        temperament === "" ? TemperamentList = [] : TemperamentList = temperament.split(", ");
        tempInput === "" ? alert("Temperament Empty") : TemperamentList.includes(tempInput) ? alert("Temperament already added") : TemperamentList.push(tempInput);
        //TemperamentList.includes(tempInput) ? alert("Temperament Empty") : TemperamentList.push(tempInput)
        TemperamentList = TemperamentList.join(", ")
        setTemperament(TemperamentList)
        setTempInput("")
        //console.log(temperament);
    }
    //-----------------------------------------------------Adition of a new temperament from Input---------------------------------
    //-----------------------------------------------------Adition of a new temperament from checkBox---------------------------------
    const addTempCheckBox = (event) => {
        let temperament1 = temperament
        setTemperament([]);
        let temperamentCheckBox = []

        if(event.target.checked) {
            temperament1 === "" ? temperamentCheckBox = [] : temperamentCheckBox = temperament1.split(", ");
            temperamentCheckBox.push(event.target.value);
            temperamentCheckBox = temperamentCheckBox.join(", ");
            setTemperament(temperamentCheckBox);
        } else {
            console.log("removed " + event.target.value);
            let temperamentCheckBox = [];
            temperamentCheckBox = temperament1.split(", ");
            temperamentCheckBox = temperamentCheckBox.filter(temperament => temperament !== event.target.value)
            temperamentCheckBox = temperamentCheckBox.join(", ");
            setTemperament(temperamentCheckBox);
        }
    }
    //-----------------------------------------------------Adition of a new temperament from checkBox--------------------------------- 
    //----------------------------------------------------Validation real time-------------------------------------------------
    const [nameValidation, setNameValidation] = useState([])
    useEffect(() => {
        var letters = /^[A-Za-z\s]*$/;
        if (name === "") {setNameValidation([])}
        else if (!(name.match(letters))) {
            setNameValidation([<p key="name_validation">Name cannot contain number or symbols.</p>]);
            return false
        }
        setNameValidation([])
    }, [name])
    //------------------Owner--------------------
    const [ownerValidation, setOwnerValidation] = useState([])
    useEffect(() => {
        var letters = /^[A-Za-z\s]*$/;
        if (owner === "") {setOwnerValidation([])}
        else if (!(owner.match(letters))) {
            setOwnerValidation([<p key="owner_validation">Owner cannot contain number or symbols.</p>]);
            return false
        }
        setOwnerValidation([])
    }, [owner])
    //------------------Heigth--------------------
    const [heightMinValidation, setHeightMinValidation] = useState([])
    useEffect(() => {
        if(parseInt(heightMin) < 1) {
            setHeightMinValidation([<p key="heightMin_validation">Height minimum needs to be more than 0.</p>]);
            return false
        }
        setHeightMinValidation([])
    }, [heightMin])

    const [heightMaxValidation, setHeightMaxValidation] = useState([])
    useEffect(() => {
        if(parseInt(heightMax) < parseInt(heightMin)) {
            setHeightMaxValidation([<p key="heightMax_validation">Height maximum need to be more or equal to height minimum.</p>]);
            return false
        }
        setHeightMaxValidation([])
    }, [heightMax])
    //------------------Weigth--------------------
    const [weightMinValidation, setWeightMinValidation] = useState([])
    useEffect(() => {
        if(parseInt(weightMin) < 1) {
            setWeightMinValidation([<p key="weightMin_validation">Weight minimum needs to be more than 0.</p>]);
            return false
        }
        setWeightMinValidation([])
    }, [weightMin])

    const [weightMaxValidation, setWeightMaxValidation] = useState([])
    useEffect(() => {
        if(parseInt(weightMax) < parseInt(weightMin)) {
            setWeightMaxValidation([<p key="weightMax_validation">Weight maximum need to be more or equal to weight minimum.</p>]);
            return false
        }
        setWeightMaxValidation([])
    }, [weightMax])
    //------------------Years----------------------------
    const [yearsMinValidation, setYearsMinValidation] = useState([])
    useEffect(() => {
        if(parseInt(yearsMin) < 1) {
            setYearsMinValidation([<p key="yearsMin_validation">Years minimum needs to be more than 0.</p>]);
            return false
        }
        setYearsMinValidation([])
    }, [yearsMin])

    const [yearsMaxValidation, setYearsMaxValidation] = useState([])
    useEffect(() => {
        if(parseInt(yearsMax) < parseInt(yearsMin)) {
            setYearsMaxValidation([<p key="yearsMax_validation">Years maximum need to be more or equal to years minimum.</p>]);
            return false
        }
        setYearsMaxValidation([])
    }, [yearsMax])
    //------------------Years----------------------------
    const [temperamentsValidation, setTemperamentsValidation] = useState([])
    useEffect(() => {
        if (temperament === "") {
            setTemperamentsValidation([<p key="temperament_validation">We need at least 1 Temperament.</p>]);
            return false
        }
        setTemperamentsValidation([])
    }, [temperament])
    //----------------------------------------------------Validation real time-------------------------------------------------   
    //----------------------------------------------------Submit Form -------------------------------------------
    const submitHandler = (event) => {
        event.preventDefault() //Prevent the page to refresh and remove the info typed in
        //Validation-------------------
        //Name
        if(name === "") {
            alert("Name must be filled out");
            return false
        }

        var letters = /^[A-Za-z\s]*$/;
        if(!(name.match(letters))) {
            alert("Name cannot contain number or symbols");
            return false
        }

        let splitedName = name.split("")
        let letter = splitedName.shift().toUpperCase()
        const finalName = letter + (splitedName.join(""))
        //Owner
        if(owner === "") {
            alert("Owner must be filled out");
            return false
        }

        //var letters = /^[A-Za-z]+$/;
        if(!(owner.match(letters))) {
            alert("Owner cannot contain number or symbols");
            return false
        }
        //Image
        let altImage = ""
        if(image === "") altImage = "https://svgsilh.com/svg/1084899.svg"
        //Height
        if(parseInt(heightMin) < 1) {
            alert("Height minimum needs to be more than 0.");
            return false
        }
        if(parseInt(heightMax) < parseInt(heightMin)) {
            alert("Height maximum need to be more or equal to height minimum.");
            return false
        }
        //Weight
        if(parseInt(weightMin) < 1) {
            alert("Weight minimum needs to be more than 0.");
            return false
        }
        if(parseInt(weightMax) < parseInt(weightMin)) {
            alert("Weight maximum need to be more or equal to weight minimum.");
            return false
        }
        //Life_span
        if(parseInt(yearsMin) < 1) {
            alert("Years minimum needs to be more than 0.");
            return false
        }
        if(parseInt(yearsMax) < parseInt(yearsMin)) {
            alert("Years maximum need to be more or equal to years minimum.");
            return false
        }
        //Temperaments
        if(temperament === "") {
            alert("We need at least 1 Temperament.");
            return false
        }
        //Validation-------------------------

        setIsPending(true)

        const dogCreation = {
            image: image===""?altImage:image,
            name: finalName,
            owner: owner,
            height: heightMin + " - " + heightMax,
            weight: weightMin + " - " + weightMax,
            years: yearsMin + " - " + yearsMax,
            temperament
        }
        axios.post("/dogs", dogCreation)
        .then(function (response) {
            alert("The breed was created")
            setIsPending(false)
        })
        .catch(function (error) {
            alert("Error: The breed is already created.")
            setIsPending(false)
        });
            
    };
    //----------------------------------------------------Submit Form -------------------------------------------
    return(
        <div className="Creation_Main">
            <div className="Creation_Second">
            <h1>Create a breed:</h1>
            <form className="Creation_Form" onSubmit={submitHandler}>

                <div>
                    <label htmlFor="name">*Name(Breed):</label>
                    <input type="text" key="name" className="nameBox" onChange={nameChangeHandler} value={name}></input>
                    {nameValidation}
                </div>

                <div>
                    <label htmlFor="owner">Owner:</label>
                    <input type="text" key="owner" className="OwnerBox" onChange={ownerChangeHandler} value={owner}></input>
                    {ownerValidation}
                </div>

                <div>
                <label htmlFor="image">Image(only url):</label>
                <input type="text" key="image" onChange={imageChangeHandler} value={image}></input>
                </div>

                <label htmlFor="height">*Height:</label>
                <div className="Creation_Minmax_box">
                    <p>Height min:</p>
                    <input type="number" key="height_Min" onChange={heightMinChangeHandler} value={heightMin}></input>
                    {heightMinValidation}
                </div>
                <div className="Creation_Minmax_box">
                    <p>Height max:</p>
                    <input type="number" key="height_Max" onChange={heightMaxChangeHandler} value={heightMax}></input>
                    {heightMaxValidation}
                </div>
                
                <label htmlFor="weight">*Weight:</label>
                <div className="Creation_Minmax_box">
                    <p>Weight max:</p>
                    <input type="number" key="weight_Min" onChange={weightMinChangeHandler} value={weightMin}></input>
                    {weightMinValidation}
                </div>
                <div className="Creation_Minmax_box">
                    <p>Weight min:</p>
                    <input type="number" key="weight_Max" onChange={weightMaxChangeHandler} value={weightMax}></input>
                    {weightMaxValidation}
                </div>

                <label htmlFor="years">*Life span:</label>
                <div className="Creation_Minmax_box">
                    <p>Years min:</p>
                    <input type="number" key="years_Min" onChange={yearsMinChangeHandler} value={yearsMin}></input>
                    {yearsMinValidation}
                </div>
                <div className="Creation_Minmax_box">
                    <p>Years max:</p>
                    <input type="number" key="years_Max" onChange={yearsMaxChangeHandler} value={yearsMax}></input>
                    {yearsMaxValidation}
                </div>

                <label htmlFor="temperament">*Temperament:</label>
                <div className="Creation_Temperaments">
                    <div className="Temperament_Boxes">
                        {tempList}
                    </div>
                    <div className="Tem_Input_Box">
                        <p>Add new Temperament:</p>
                        <input type="text" key="temperament" onChange={tempInputChangeHandler} value={tempInput}></input>
                        <p>*Start with Uppercase</p>
                        <button onClick={addTempBox}> Add Temperament</button>
                    </div>
                </div>
                <p>Temperaments Added: {temperament}</p>
                {temperamentsValidation}

                <p>All marked with * are necessary.</p>
                { isPending ? <button disable="true" >Creating ...</button> : <button>Create</button>}
                
                <p> </p>
            </form>
            </div>
        </div>
    )
}

export default Creation;

