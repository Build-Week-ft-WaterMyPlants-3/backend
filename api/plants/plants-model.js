const db = require("../data/db-config");


function getAllPlants(){
    return db("Plants")
}

function getByPlantId(PlantId){
    return db("Plants")
            .where("PlantId", PlantId)
}

async function updatePlantByPlantId(UpdatedPlant){
    await db("Plants")
            .where("PlantId", PlantId)
            .update(UpdatedPlant)

    return getByPlantId(UpdatedPlant.PlantId)
}

 async function addPlant(plantToAdd){
    const plantToAddId = await db("Plants")
            .insert(plantToAdd)
    return plantToAddId;
}

async function deletePlantByPlantId(PlantId){
    await db("Plants")
            .where("PlantId", PlantId)
            .del()
    return getAllPlants()
}

module.exports = {
    getAllPlants, getByPlantId, updatePlantByPlantId, addPlant, deletePlantByPlantId
}