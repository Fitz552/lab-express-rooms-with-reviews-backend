const express = require("express")

const router = express.Router();

const Room = require("../models/Room.model")
const isAuthenticated = require("../middlewares/isAuthenticated")


router.post("/", isAuthenticated, (req,res) => {
    Room.create(req.body)
    .then ( (response) => {
        res.status(201).json(response)
        console.log(response)
    })
    .catch(error => {
        res.status(400).json(error)
        console.log(error)
    })
})

router.patch("/:id", isAuthenticated, (req,res) => {
    Room.findOneAndUpdate({_id: req.params.id},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    .then (result => {
        res.status(200).json(result)
    })
    .catch (error => {
        res.status(400).json(error)
    })
})

router.delete("/:id", isAuthenticated, (req,res) => {
    Room.deleteOne({_id: req.params.id})
    .then (result => {
        if (result.deletedCount < 1) {
            res.status(404).json("Produto não encontrado")
        }
        else (
            res.status(200).json({})
        )
        
    })
    .catch (error => {
        res.status(400).json(error)
    })
})

router.get("/", isAuthenticated, (req,res) => {
    Room.find().populate("reviews")
    .then(response => {
        res.status(200).json(response)
    })
    .catch (error => {
        res.status(400).json(error)
    })
})

module.exports = router