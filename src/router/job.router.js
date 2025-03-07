import express from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteAllJobs,
  deleteJobs,
} from "../controller/job.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API to manage job postings
 */

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     description: Retrieve a list of all jobs.
 *     responses:
 *       200:
 *         description: A list of jobs
 */
router.route("/").get(getAllJobs);

/**
 * @swagger
 * /api/v1/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     description: Add a new job to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - salary
 *             properties:
 *               title:
 *                 type: string
 *                 example: Software Engineer
 *               description:
 *                 type: string
 *                 example: Full stack developer role
 *               salary:
 *                 type: number
 *                 example: 70000
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.route("/").post(createJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     description: Retrieve job details using a specific ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a8b4d5f1234e6789abcdef
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 *       404:
 *         description: Job not found
 */
router.route("/:id").get(getJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
 *     description: Modify job details using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.route("/:id").patch(updateJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     description: Remove a job using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a8b4d5f1234e6789abcdef
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
router.route("/:id").delete(deleteJobs);

/**
 * @swagger
 * /api/v1/jobs:
 *   delete:
 *     summary: Delete all jobs
 *     tags: [Jobs]
 *     description: Remove all job records from the database.
 *     responses:
 *       200:
 *         description: All jobs deleted successfully
 */
router.route("/").delete(deleteAllJobs);

export default router;
