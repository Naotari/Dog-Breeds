const { Router } = require('express');
const { Dog } = require('../db.js');
const axios = require('axios');

const dogs = Router();

dogs.get("/",  async (req,res) => {
    try {
        const {name} = req.query
            const breedList = []

            const response = await axios.get("https://api.thedogapi.com/v1/breeds")
            response.data.forEach(dog => {
                if(!(breedList.includes(dog.name))) breedList.push({
                    id: dog.id,
                    image: dog.image.url,
                    breed: dog.name,
                    temperament: dog.temperament,
                    weight: dog.weight.metric,
                    height: dog.height.metric
                })
            })

            const dogs = await Dog.findAll();
            dogs.forEach(dog => breedList.push({
                id: dog.id,
                image: dog.image,
                name: dog.name,
                breed: dog.breed,
                temperament: dog. temperament,
                weight: dog.weight,
                height: dog.height,
                created: dog.ceatedInDb,
                deleted: dog.deleted,
            }))

            res.status(201).send(breedList);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

dogs.get("/:id",  async (req,res) => {
    try {
        const {id} = req.params;
        if(id.length > 6) {
            const dogDb = await Dog.findAll({where: {id}});
            if(dogDb.length === 0) throw Error("No Se encontro el perro");
            const dogDetails = {
                id: dogDb[0].dataValues.id,
                image: dogDb[0].dataValues.image,
                name: dogDb[0].dataValues.name,
                breed: dogDb[0].dataValues.breed,
                owner: dogDb[0].dataValues.owner,
                temperament: dogDb[0].dataValues.temperament,
                weight: dogDb[0].dataValues.weight,
                height: dogDb[0].dataValues.height,
                ceatedInDb: dogDb[0].dataValues.ceatedInDb,
                deleted: dogDb[0].dataValues.deleted
            }
            res.status(201).send(dogDetails);
            
        } else {
            console.log("esta buscando en la api");
            const response = await axios.get("https://api.thedogapi.com/v1/breeds");
            const dog = response.data.find(dog => dog.id === parseInt(id));
            if(dog.length === 0) throw Error("No Se encontro el perro");
            let year = dog.life_span.split(" years")
            year = year[0]
            const dogDetails = {
                id: dog.id,
                image: `${dog.reference_image_id ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` : null}`,
                breed: dog.name,
                temperament: dog.temperament,
                weight: dog.weight.metric,
                height: dog.height.metric,
                year,
                origin: dog.origin 
            }
            res.status(201).send(dogDetails);
        }

        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

dogs.post("/", async (req,res) => {
    try {
        console.log(req.body);
        const { name, breed, owner, image, height, weight, temperament } = req.body;
        if ( !name || !breed || !owner || !image || !temperament ) throw Error("Falta informacion del perro.")
        const newDog = await Dog.create({ name, breed, owner, image, height, weight, temperament });
        res.status(201).send(newDog);
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports = dogs;