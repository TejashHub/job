import Job from "../model/job.model.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import asyncWrapper from "../middleware/async-wrapper.middleware.js";
import { StatusCodes } from "http-status-codes";

const getAllJobs = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
  } = req;
  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Jobs Fetch Successfully",
    jobs,
    total: jobs.length,
  });
});

const getJob = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Jobs Fetch Successfully",
    job,
    total: job.length,
  });
});

const createJob = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const jobs = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Jobs Created Successfully",
    jobs,
  });
});

const updateJob = asyncWrapper(async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!company || !position) {
    throw new BadRequestError("Company and position fields cannot be empty.");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Jobs Updated Successfully",
  });
});

const deleteAllJobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.deleteMany();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Jobs Deleted Successfully",
  });
});

const deleteJobs = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Jobs Deleted Successfully",
  });
});

export { getAllJobs, getJob, createJob, updateJob, deleteAllJobs, deleteJobs };
