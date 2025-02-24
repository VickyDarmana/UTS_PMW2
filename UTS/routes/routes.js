const express = require("express");
const router = express.Router();
const mahasiswaController = require("../controllers/mahasiswaController");

router.get("/", mahasiswaController.index);
router.get("/tambah", mahasiswaController.tambah);
router.post("/simpan", mahasiswaController.simpan);
router.get("/edit/:id", mahasiswaController.edit);
router.post("/update/:id", mahasiswaController.update);
router.get("/hapus/:id", mahasiswaController.hapus);

module.exports = router;
