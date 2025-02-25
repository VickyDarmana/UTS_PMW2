$(document).ready(function () {
    loadMahasiswa();

    // Fungsi untuk menampilkan mahasiswa
    function loadMahasiswa() {
        $.get("/mahasiswa", function (data) {
            let mahasiswaRows = "";
            data.forEach(m => {
                mahasiswaRows += `
                <tr>
                    <td>${m.id}</td>
                    <td>${m.nama}</td>
                    <td>${m.nim}</td>
                    <td>${m.jurusan}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${m.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${m.id}">Hapus</button>
                    </td>
                </tr>`;
            });
            $("#mahasiswaList").html(mahasiswaRows);
        });
    }

    // Tambah Mahasiswa
$("#addMahasiswaForm").submit(function (e) {
    e.preventDefault();
    const mahasiswaData = {
        nama: $("#nama").val(),
        nim: $("#nim").val(),
        jurusan: $("#jurusan").val(),
    };

    $.post("/mahasiswa/create", mahasiswaData, function (response) {
        alert(response.message);
        $("#addMahasiswaForm")[0].reset();
        loadMahasiswa(); // Memuat ulang tabel setelah tambah data
    }).fail(function () {
        alert("Gagal menambahkan mahasiswa.");
    });
});

    // Hapus Mahasiswa
    $(document).on("click", ".delete-btn", function () {
        const mahasiswaId = $(this).data("id");

        if (confirm("Yakin ingin menghapus mahasiswa ini?")) {
            $.ajax({
                url: `/mahasiswa/delete/${mahasiswaId}`,
                type: "DELETE",
                success: function () {
                    alert("Mahasiswa berhasil dihapus!");
                    loadMahasiswa();
                }
            });
        }
    });

    // Edit Mahasiswa
    $(document).on("click", ".edit-btn", function () {
        const mahasiswaId = $(this).data("id");

        $.get(`/mahasiswa/${mahasiswaId}`, function (data) {
            $("#nama").val(data.nama);
            $("#nim").val(data.nim);
            $("#jurusan").val(data.jurusan);

            // Ubah tombol tambah menjadi update
            $("#addMahasiswaForm button").text("Update").removeClass("btn-primary").addClass("btn-success");

            // Tambahkan event listener untuk update
            $("#addMahasiswaForm").off("submit").submit(function (e) {
                e.preventDefault();
                const updateData = {
                    nama: $("#nama").val(),
                    nim: $("#nim").val(),
                    jurusan: $("#jurusan").val(),
                };

                $.ajax({
                    url: `/mahasiswa/update/${mahasiswaId}`,
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(updateData),
                    success: function () {
                        alert("Mahasiswa berhasil diperbarui!");
                        $("#addMahasiswaForm")[0].reset();
                        $("#addMahasiswaForm button").text("Tambah").removeClass("btn-success").addClass("btn-primary");
                        loadMahasiswa();
                    }
                });
            });
        });
    });
});
