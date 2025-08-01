"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function InputPage() {
  const [namaBarang, setNamaBarang] = useState("");
  const [lokasiRak, setLokasiRak] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaBarang || !lokasiRak) {
      alert("Nama barang dan lokasi rak wajib diisi");
      return;
    }

    try {
      await addDoc(collection(db, "barang"), {
        nama: namaBarang,
        lokasi: lokasiRak.toUpperCase(),
        tanggalMasuk: serverTimestamp(),
        status: "tersimpan", // default status
      });
      setNamaBarang("");
      setLokasiRak("");
      alert("Barang berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menambahkan barang: ", error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Input Barang</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Barang:</label><br />
          <input
            type="text"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lokasi Rak (misal A1 - F6):</label><br />
          <input
            type="text"
            value={lokasiRak}
            onChange={(e) => setLokasiRak(e.target.value)}
            required
          />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
