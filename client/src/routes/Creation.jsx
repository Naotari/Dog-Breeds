import React from "react";
import "./Creation.css"
//import {Link} from "react-router-dom"
import { useState, useEffect} from "react";
import axios from "axios";

const Creation = (props) => {

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [ImageCloud, setImageCloud] = useState("");
    const [height, setHeight] = useState("0");
    const [weight, setWeight] = useState("0");
    const [tempInput, setTempInput] = useState("");
    const [tempList, setTempList] = useState([])
    const [breedsList, setBreedsList] = useState([])
    const [owner, setOwner] = useState("")
    const [temperament, setTemperament] = useState("")
    const [isPending, setIsPending] = useState(false);
    
    const nameChangeHandler = (event) => {setName(event.target.value)};
    const breedChangeHandler = (event) => {setBreed(event.target.value)};
    const heightChangeHandler = (event) => {setHeight(event.target.value)};
    const weightChangeHandler = (event) => {setWeight(event.target.value)};
    const tempInputChangeHandler = (event) => {setTempInput(event.target.value)};
    const ownerChangeHandler = (event) => {setOwner(event.target.value)};
    const imageCloudChangeHandler = (event) => {
        const imageData = new FormData();
        imageData.append("file", event.target.files[0]);
        imageData.append("folder", "/Dog Breeds/Created Dogs");
        imageData.append("upload_preset", "dog_upload");
        axios
          .post("https://api.cloudinary.com/v1_1/dyiymsxec/upload/", imageData)
          .then((response) => {
            console.log(response);
            setImageCloud(response.data.secure_url);
          });
      };
      //-----------------------------------------------------Breed List---------------------------------
      useEffect(() => {
        const BreedsListRaw = []
        async function fetchData() {
            const response = await axios.get("/dogs")
            response.data.forEach(dog => BreedsListRaw.push(
                <option key={dog.id}>{dog.breed}</option>
            ));
            setBreedsList(BreedsListRaw)
        }
        fetchData();
    }, [])
      //-----------------------------------------------------Breed List---------------------------------
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
            console.log(temperament1);
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
    //----------------Name------------------------
    const [nameValidation, setNameValidation] = useState([])
    useEffect(() => {
        var letters = /^[A-Za-z\s]*$/;
        if (name === "") {setNameValidation([])}
        else if (!(name.match(letters))) {
            setNameValidation([<p key="name_validation" style={{color: "red"}}>Name cannot contain number or symbols.</p>]);
            return false
        }
        setNameValidation([])
    }, [name])
    //------------------Breed--------------------
    const [breedValidation, setBreedValidation] = useState([]);
    useEffect(() => {
        if( breed === "") setBreedValidation([<p key="breed_validation" style={{color: "red"}}>Breed cannot be empty.</p>])
        else setBreedValidation([])
    }, [breed])
    //------------------Owner--------------------
    const [ownerValidation, setOwnerValidation] = useState([])
    useEffect(() => {
        var letters = /^[A-Za-z\s]*$/;
        if (owner === "") {setOwnerValidation([])}
        else if (!(owner.match(letters))) {
            setOwnerValidation([<p key="owner_validation" style={{color: "red"}}>Owner cannot contain number or symbols.</p>]);
            return false
        }
        setOwnerValidation([])
    }, [owner])
    //------------------Heigth--------------------
    const [heightValidation, setHeightValidation] = useState([])
    useEffect(() => {
        if(parseInt(height) < 1) {
            setHeightValidation([<p key="height_validation" style={{color: "red"}}>Height needs to be more than 0.</p>]);
            return false
        }
        setHeightValidation([])
    }, [height])
    //------------------Weigth--------------------
    const [weightValidation, setWeightValidation] = useState([])
    useEffect(() => {
        if(parseInt(weight) < 1) {
            setWeightValidation([<p key="weight_validation" style={{color: "red"}}>Weight needs to be more than 0.</p>]);
            return false
        }
        setWeightValidation([])
    }, [weight])
    //------------------Temperaments----------------------------
    const [temperamentsValidation, setTemperamentsValidation] = useState([])
    useEffect(() => {
        if (temperament === "") {
            setTemperamentsValidation([<p key="temperament_validation" style={{color: "red"}}>We need at least 1 Temperament.</p>]);
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
        //Breed
        if(breed === "") {
            alert("Breed cannot be empty.");
            return false
        }
        //Owner
        if(owner === "") {
            alert("Owner must be filled out");
            return false
        }
        if(!(owner.match(letters))) {
            alert("Owner cannot contain number or symbols");
            return false
        }
        let splitedOwner = owner.split("")
        let letterOwner = splitedOwner.shift().toUpperCase()
        const finalOwner = letterOwner + (splitedOwner.join(""))
        //Height
        if(parseInt(height) < 1) {
            alert("Height needs to be more than 0.");
            return false
        }
        //Weight
        if(parseInt(weight) < 1) {
            alert("Weight needs to be more than 0.");
            return false
        }
        //Temperaments
        if(temperament === "") {
            alert("We need at least 1 Temperament.");
            return false
        }
        //Image
        if(ImageCloud === "") {
            alert("We need a picture of your dog.");
            return false
        }
        //Validation-------------------------

        setIsPending(true)

        const dogCreation = {
            name: finalName,
            breed: breed,
            owner: finalOwner,
            image: ImageCloud,
            height,
            weight,
            temperament
        }
        axios.post("/dogs", dogCreation)
        .then(function (response) {
            alert("The Dog was created")
            setIsPending(false)
        })
        .catch(function (error) {
            alert("Error: The Dog is already created.")
            setIsPending(false)
        });
        setName("");
        setBreed("");
        setOwner("");
        setHeight("0");
        setWeight("0");
        setTemperament("");
        setImageCloud("");
    };
    //----------------------------------------------------Submit Form -------------------------------------------
    return(
        <div className="Creation_Main">
            <div className="Creation_Second">
            <h1>Post your Dog:</h1>
            <form onSubmit={submitHandler}>
                <div className="Creation_Form">
                <div className="Creation_First_Column">
                    <div className="Creation_Image_Box">
                        Picture:
                        <img alt="imagecloud" src={ ImageCloud ? ImageCloud : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" } className="Creation_Image" ></img>
                        <input type="file" onChange={imageCloudChangeHandler}></input>
                    </div>
                </div>
                <div className="Creation_Second_Column">
                    <div className="Creation_Second_Column_Box">
                        <label htmlFor="name">Name:</label>
                        <input type="text" key="name" onChange={nameChangeHandler} value={name}></input>
                    </div>
                        {nameValidation}
                    <div className="Creation_Second_Column_Box">
                        <label htmlFor="breed">Breed:</label>
                        <select name="breed" onChange={breedChangeHandler} value={breed}>
                            <option key="empty" value=""></option>
                                {breedsList}
                                <option key="half" value="Half-Breed">Half-Breed</option>
                        </select>
                    </div>
                        {breedValidation}
                    <div className="Creation_Second_Column_Box">
                        <label htmlFor="owner">Owner:</label>
                        <input type="text" key="owner" onChange={ownerChangeHandler} value={owner}></input>
                    </div>
                        {ownerValidation}
                    <div  className="Creation_Second_Column_Box">
                        <label htmlFor="height">Height(centimeters):</label>
                        <input type="number" key="height" onChange={heightChangeHandler} value={height}></input>
                    </div>
                        {heightValidation}
                    <div  className="Creation_Second_Column_Box">
                        <label htmlFor="weight">Weight(pounds):</label>
                        <input type="number" key="weight" onChange={weightChangeHandler} value={weight}></input>
                    </div>
                        {weightValidation}
                </div>
                <div className="Creation_Third_Column">
                    <label htmlFor="temperament">Temperament:</label>
                    <div className="Temperament_Boxes">
                        {tempList}
                    </div>
                    <div className="Tem_Input_Box">
                        <p>Add new Temperament:</p>
                        <input type="text" key="temperament" onChange={tempInputChangeHandler} value={tempInput}></input>
                        <button onClick={addTempBox}> Add Temperament</button>
                    </div>
                    <p>Temperaments Added: {temperament}</p>
                    {temperamentsValidation}
                </div>
                </div>
                { isPending ? <button disable="true" className="Creation_Button">Creating ...</button> : <button  className="Creation_Button">Create</button>}
            </form>
            </div>
        </div>
    )
}

export default Creation;

