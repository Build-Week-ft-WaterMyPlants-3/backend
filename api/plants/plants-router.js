const router = require("express").Router();
const Plants = require("./plants-model");

//ENDPOINTS
//[GET] All Plants
router.get("/", (req, res)=>{
    Plants.getAllPlants()
    .then(allPlants => {
        res.status(200).json(allPlants);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

//[GET] Plant By PlantId
router.get("/:PlantId", (req, res)=>{
    const { PlantId } = req.params;
    
    if(PlantId){
        Plants.getByPlantId(PlantId)
        .then(specificPlant => {
            res.status(200).json(specificPlant[0]);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    } else {
        res.status(406).json({message: "Plant Id Required"});
    }
})

//[PUT] / Update Plant By PlantId
router.put("/:PlantId", (req, res)=>{
    const updatedPlant = req.body;

    if(updatedPlant.Name && updatedPlant.PlantId){
        Plants.updatePlantByPlantId(updatedPlant)
            .then(update => {
                res.status(200).json(update[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
    } else {
        res.status(406).json({message: "PlantId And Name Are Required"});
    }
})

//[POST] New Plant
router.post("/", (req, res)=>{
    const newPlant = req.body;

    if(newPlant.PlantId && newPlant.Name){
        if (typeof newPlant.PlantId === "number"){
            Plants.addPlant(newPlant)
            .then(newestPlant => {
                res.status(200).json(newestPlant[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "PlantId Must Be A Number"});
        }
    } else {
        res.status(406).json({message: "PlantId And Name Are Required"});
    }
})

//[DELETE] Plant By PlantId
router.delete("/:PlantId", (req, res)=>{
    const { PlantId } = req.params;

    Plants.deletePlant(PlantId)
    .then(resolution => {
        res.status(200).json(resolution);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

module.exports = router;