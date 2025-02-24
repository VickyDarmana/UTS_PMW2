const mongoose = require("mongoose");

const MahasiswaSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  nim: { type: String, required: true, unique: true },
  jurusan: { type: String, required: true },
});

module.exports = mongoose.model("Mahasiswa", MahasiswaSchema);
