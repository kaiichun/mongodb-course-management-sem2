const express = require("express");
const router = express.Router();

// Import the course model
const Course = require("../models/course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/
router.get("/", async (request, response) => {
  try {
    const courses = await Course.find().populate("instructor");
    response.status(200).send(courses);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)
router.get("/:id", async (request, response) => {
  try {
    const data = await Course.findOne({ _id: request.params.id }).populate(
      "instructor"
    );
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// instruction: setup POST /: Add a new course
router.post("/", async (request, response) => {
  try {
    const newCourse = new Course({
      title: request.body.title,
      instructor: request.body.instructor,
      startDate: request.body.startDate,
      endDate: request.body.endDate,
      subject: request.body.subject,
      description: request.body.description,
      enrollmentCount: request.body.enrollmentCount,
    });
    await newCourse.save();
    response.status(200).send(newCourse);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id
router.put("/:id", async (request, response) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      request.params.id,
      {
        title: request.body.title,
        subject: request.body.subject,
        description: request.body.description,
        endDate: request.body.endDate,
        startDate: request.body.startDate,
        instructor: request.body.instructor,
        enrollmentCount: request.body.enrollmentCount,
      },
      { new: true }
    );
    response.status(200).send(updatedCourse);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`
router.delete("/:id", async (request, response) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(request.params.id);
    response.status(204).send("Deleted successful");
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// Export the router
module.exports = router;
