const exp = require("express");
const adminApp = exp.Router();

const expressAsyncHandler = require("express-async-handler");


const {
  getAdmins,
  getAdminByUsername,
  createAdmin,
  updateAdmin,
  removeAdmin,
  loginAdmin
} = require("../Controllers/admin-controller");


adminApp.get("/admins", expressAsyncHandler(getAdmins));

adminApp.get("/admin/:username", expressAsyncHandler(getAdminByUsername));

adminApp.post("/admin", expressAsyncHandler(createAdmin));

adminApp.post("/login", expressAsyncHandler(loginAdmin));

adminApp.put("/admin", expressAsyncHandler(updateAdmin));

adminApp.delete("/admin/:username", expressAsyncHandler(removeAdmin));


module.exports = adminApp;