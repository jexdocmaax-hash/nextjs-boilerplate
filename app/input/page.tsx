"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function InputBarang() {
  const [namaBarang, setNamaBarang] = useState("");
  const [lokasiRak, setLokasiRak] = useState("");
  const [statusPalet, setStatusPalet] = useState("Belum Full");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    const barangRef = collection(db, "barang");

    // Cek apakah lokasi sudah terisi
    const q = query(barangRef, where("lokasiRak", "==", lokasiRak));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setPesan("❌ Lokasi ini sudah terisi.");
      setLoading(false);
      return;
    }

    await addDoc(barangRef, {
      namaBarang,
      lokasiRak,
      statusPalet,
      tanggalMasuk: new Date().toISOString().split("T")[0],
    });

    setNamaBarang("");
    setLokasiRak("");
    setStatusPalet("Belum Full");
    setPesan("✅ Barang berhasil ditambahkan.");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Input Barang</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Barang"
          value={namaBarang}
          onChange={(e) => setNamaBarang(e.target.value)}
          required
          className="w-full border p-2"
        />
        <input
          type="text"
          placeholder="Lokasi Rak (mis: A1-L1)"
          value={lokasiRak}
          onChange={(e) => setLokasiRak(e.target.value)}
          required
          className="w-full border p-2"
        />
        <select
          value={statusPalet}
          onChange={(e) => setStatusPalet(e.target.value)}
          className="w-full border p-2"
        >
          <option value="Belum Full">Belum Full</option>
          <option value="Full">Full</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Barang"}
        </button>
        {pesan && <p className="text-center mt-2">{pesan}</p>}
      </form>
    </div>
  );
}
