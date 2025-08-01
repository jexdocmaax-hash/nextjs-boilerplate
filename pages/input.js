// pages/input.js
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function InputBarang() {
  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [status, setStatus] = useState("Belum Full");
  const [pesan, setPesan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "barang"), {
        nama,
        lokasi,
        status,
        tanggalMasuk: Timestamp.now(),
      });
      setPesan("✅ Barang berhasil disimpan");
      setNama("");
      setLokasi("");
      setStatus("Belum Full");
    } catch (err) {
      console.error("❌ Gagal simpan:", err);
      setPesan("❌ Gagal menyimpan data");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Input Barang</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Barang: </label>
          <input value={nama} onChange={(e) => setNama(e.target.value)} required />
        </div>
        <div>
          <label>Lokasi Rak: </label>
          <input value={lokasi} onChange={(e) => setLokasi(e.target.value)} required />
        </div>
        <div>
          <label>Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Belum Full">Belum Full</option>
            <option value="Full">Full</option>
          </select>
        </div>
        <button type="submit">Simpan</button>
      </form>
      <p>{pesan}</p>
    </div>
  );
}
