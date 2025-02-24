const Mahasiswa = require("../models/Mahasiswa");

// Tampilkan semua mahasiswa
exports.index = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find();
    res.render("mahasiswa/index", { mahasiswa });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Tampilkan form tambah
exports.tambah = (req, res) => {
  res.render("mahasiswa/tambah");
};

// Proses tambah mahasiswa
exports.simpan = async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    const mahasiswaBaru = new Mahasiswa({ nama, nim, jurusan });
    await mahasiswaBaru.save();
    res.redirect("/mahasiswa");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Tampilkan form edit
exports.edit = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.id);
    res.render("mahasiswa/edit", { mahasiswa });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Proses update mahasiswa
exports.update = async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    await Mahasiswa.findByIdAndUpdate(req.params.id, { nama, nim, jurusan });
    res.redirect("/mahasiswa");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Hapus mahasiswa
exports.hapus = async (req, res) => {
  try {
    await Mahasiswa.findByIdAndDelete(req.params.id);
    res.redirect("/mahasiswa");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
