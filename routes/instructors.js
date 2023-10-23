const express = require("express");
const router = express.Router();

// Import the instructor model
const Instructor = require("../models/instructor");

// GET /: List all instructors
router.get("/", async (request, response) => {
  try {
    const instructors = await Instructor.find();
    response.status(200).send(instructors);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// GET /:id: Get a specific instructor by its _id
router.get("/:id", async (request, response) => {
  try {
    const instructor = await Instructor.findOne({ _id: request.params.id });
    response.status(200).send(instructor);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// POST /: Add a new instructor
router.post("/", async (request, response) => {
  try {
    const newInstructor = new Instructor({
      name: request.body.name,
      qualification: request.body.qualification,
      profile: request.body.profile,
      coursesTaught: request.body.coursesTaught,
    });
    await newInstructor.save();
    response.status(200).send(newInstructor);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// PUT /:id: Update an instructor by its _id
router.put("/:id", async (request, response) => {
  try {
    const instructorID = request.params.id;

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorID,
      {
        name: request.body.name,
        qualification: request.body.qualification,
        profile: request.body.profile,
        coursesTaught: request.body.coursesTaught,
      },
      { new: true }
    );
    response.status(200).send(updatedInstructor);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (request, response) => {
  try {
    const instructorID = request.params.id;
    const deletedInstructor = await Instructor.findByIdAndDelete(instructorID);
    response.status(400).send({ message: "Instructor is deleted" });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// Export the router
module.exports = router;
