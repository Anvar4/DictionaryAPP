const authRoutes = require("./auth/auth.route.js");
const dictionaryRoutes = require("./dictionary.routes.js");
const departmentRoutes = require("./department.routes.js");
const categoryRoutes = require("./category.routes.js");
const wordRoutes = require("./word.routes.js");
const uploadRoutes = require("./upload.routes.js");

const main_router = [
  { path: "/api/auth", router: authRoutes },
  { path: "/api/dictionaries", router: dictionaryRoutes },
  { path: "/api/departments", router: departmentRoutes },
  { path: "/api/categories", router: categoryRoutes },
  { path: "/api/words", router: wordRoutes },
  { path: "/api/upload", router: uploadRoutes }
];

module.exports = main_router;
