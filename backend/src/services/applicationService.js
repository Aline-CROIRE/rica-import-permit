// services/applicationService.js

const fs = require("fs").promises;
const path = require("path");

const APPLICATIONS_DIR = path.join(__dirname, "../../data/applications");
const APPLICATIONS_FILE = path.join(APPLICATIONS_DIR, "applications.json");

const ensureDirectoryExists = async (dir) => {
  try {
    await fs.access(dir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
};

const saveApplication = async (application) => {
  try {
    await ensureDirectoryExists(APPLICATIONS_DIR);

    let applications = [];
    try {
      const data = await fs.readFile(APPLICATIONS_FILE, "utf8");
      applications = JSON.parse(data);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    applications.push(application);

    await fs.writeFile(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
  } catch (error) {
    throw new Error("Failed to save application data.");
  }
};

const getApplication = async (applicationId) => {
  try {
    const data = await fs.readFile(APPLICATIONS_FILE, "utf8");
    const applications = JSON.parse(data);
    return applications.find((app) => app.id === applicationId) || null;
  } catch (error) {
    return null;
  }
};

const getAllApplications = async () => {
  try {
    const data = await fs.readFile(APPLICATIONS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

module.exports = {
  saveApplication,
  getApplication,
  getAllApplications,
};