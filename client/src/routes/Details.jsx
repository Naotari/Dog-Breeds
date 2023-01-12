import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Details.css"


const Details = (props) => {
   
    const [dogDetails, setDogDetails] = useState([])


    let urlRef = window.location.href
    urlRef = window.location.href.toString()
    urlRef = urlRef.split("details/")
    urlRef = urlRef[1]

    useEffect(() => {
        async function fetchData() {
            const dogListApi = await axios.get(`/dogs/${urlRef}`)
            const dogArray = [
                <div key={dogListApi.data.id}>
                    <h1>{dogListApi.data.breed}</h1>
                    <img src={dogListApi.data.image} alt="dog not found" width="300px"/>
                    <div className="Home_Box_Text">
                        {dogListApi.data.name ? <p>Name: {dogListApi.data.name}</p> : <p>Example</p>}
                        <p>Temperament: {dogListApi.data.temperament}</p>
                        <p>Weight: {dogListApi.data.weight} pounds</p>
                        <p>Height: {dogListApi.data.height} cm.</p>
                        {dogListApi.data.year && <p>Life span: {dogListApi.data.year} years</p>}
                        {dogListApi.data.owner && <p>Owner: {dogListApi.data.owner}</p>}
                    </div>
                </div>
            ]
            dogArray.push(
            )
            setDogDetails(dogArray);
        }
        fetchData();
    },[urlRef])

    return(
        <div className="Details_Main">
            <div className="Details_Second">
                <h1>Details of:</h1>
                <div>
                    {dogDetails}
                </div>
            </div>
        </div>
    )
}

export default Details;