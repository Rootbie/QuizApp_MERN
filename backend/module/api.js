const express = require("express")
const mongodb = require("mongodb")
const router = express.Router()

// get all questions
router.get("/questions", async function (req, res) {
    const docs = await req.db.collection('questions').find().toArray()

    for (const doc of docs) {
        doc.correctAnswer = doc.answers[doc.correctAnswer]
    }

    res.status(200).json(docs)
})

//create a new question
router.post("/questions", async function (req, res) {
    const newQues = req.body

    if (newQues.answers === undefined) { newQues['answers'] = [] }

    if (newQues.correctAnswer === undefined) {
        newQues['correctAnswer'] = -1

    } else newQues.correctAnswer = Number(newQues.correctAnswer)

    await req.db.collection('questions').insertOne(newQues)

    res.status(201)
})

//get details of a question
router.get("/questions/:id", async function (req, res) {
    const id = req.params.id

    const doc = await req.db.collection('questions').findOne({ _id: mongodb.ObjectId(id) })
    if (doc === null) {
        return res.status(404).end()
    }

    res.status(200).json(doc)
})

//edit an existing question
router.put("/questions/:id", async function (req, res) {
    const id = req.params.id
    const query = { _id: mongodb.ObjectId(id) }

    const doc = await req.db.collection('questions').findOne(query)
    if (doc === null) {
        return res.status(404).end()
    }

    const anotherQues = req.body

    if (anotherQues.answers === undefined) { anotherQues['answers'] = [] }

    if (anotherQues.correctAnswer === undefined) {
        anotherQues['correctAnswer'] = -1

    } else anotherQues.correctAnswer = Number(anotherQues.correctAnswer)

    const update = { $set: anotherQues }

    const updateQuestion = await req.db.collection('questions').updateOne(query, update)

    if (updateQuestion.acknowledged === false) {
        return res.status(400).end()
    }

    res.status(200)

})

// delete a question
router.delete("/questions/:id", async function (req, res) {
    const id = req.params.id

    await req.db.collection('questions').deleteOne({ _id: mongodb.ObjectId(id) })

    res.status(200)
})


module.exports = router