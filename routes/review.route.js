const express = require("express")

const router = express.Router();

const Review = require("../models/Review.model")
const Room = require("../models/Room.model")
const isAuthenticated = require("../middlewares/isAuthenticated")

router.post("/", isAuthenticated, async (req, res) => {
    try {
        //lacking validation on who created the room
        const newReview = await Review.create(req.body)
        const updatedRoom = await Room.findOneAndUpdate({_id: req.body.roomId},
            {$push: {reviews: newReview._id}}
        )
        res.status(201).json(newReview)
    }

    catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router