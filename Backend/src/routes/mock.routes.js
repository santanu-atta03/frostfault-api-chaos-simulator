const express = require("express");
const router = express.Router();

const {
  createMockApi,
  getAllMockApis,
  getMockApiById,
  updateMockApi,
  exportMockApi,
  importMockApi
} = require("../controllers/mock.controller");

// CREATE
router.post("/create", createMockApi);

// LIST
router.get("/", getAllMockApis);

// EXPORT (JSON)
router.get("/:id/export", exportMockApi);

// GET ONE
router.get("/:id", getMockApiById);

// UPDATE
router.put("/:id", updateMockApi);

// IMPORT
router.post("/import", importMockApi);

router.delete("/:id", async (req, res) => {
  await MockApi.findByIdAndDelete(req.params.id);
  res.json({ message: "Mock API deleted" });
});

module.exports = router;
