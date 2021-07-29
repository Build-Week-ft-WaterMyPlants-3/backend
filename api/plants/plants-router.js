const router = require("express").Router();
const Plants = require("./plants-model");

//ENDPOINTS
//[GET] All Plants
router.get("/", (req, res) => {
  Plants.getAllPlants()
    .then((allPlants) => {
      res.status(200).json(allPlants);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//[GET] Plant By PlantId
router.get("/:plantId", (req, res) => {
  const { plantId } = req.params;

  if (plantId) {
    Plants.getByPlantId(plantId)
      .then((specificPlant) => {
        res.status(200).json(specificPlant[0]);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(406).json({ message: "Plant Id Required" });
  }
});

//[PUT] / Update Plant By PlantId
router.put("/:plantId", (req, res) => {
  const updatedPlant = req.body;

  if (updatedPlant.nickname && req.params.plantId) {
    Plants.updatePlantByPlantId(updatedPlant)
      .then((update) => {
        res.status(200).json(update[0]);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(406).json({ message: "PlantId And Name Are Required" });
  }
});

//[POST] New Plant
router.post("/", (req, res) => {
  const newPlant = req.body;

  if (newPlant.plantId && newPlant.nickname) {
    if (typeof newPlant.plantId === "number") {
      Plants.addPlant(newPlant)
        .then((newestPlant) => {
          res.status(200).json(newestPlant[0]);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(406).json({ message: "PlantId Must Be A Number" });
    }
  } else {
    res.status(406).json({ message: "PlantId And Name Are Required" });
  }
});

//[DELETE] Plant By PlantId
router.delete("/:plantId", (req, res) => {
  const { plantId } = req.params;

  Plants.deletePlant(plantId)
    .then((resolution) => {
      res.status(200).json(resolution);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
