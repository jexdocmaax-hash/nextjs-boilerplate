'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

interface Barang {
  id: string;
  namaBarang: string;
  lokasiRak: string;
  tanggalMasuk: string;
  statusFull: boolean;
}

export default function ListBarang() {
  const [barang, setBarang] = useState<Barang[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'barang'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Barang[];
      setBarang(data);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>
      {barang.length === 0 ? (
        <p>Belum ada barang.</p>
      ) : (
        <div className="space-y-3">
          {barang.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow-sm">
              <p><strong>Nama Barang:</strong> {item.namaBarang}</p>
              <p><strong>Lokasi Rak:</strong> {item.lokasiRak}</p>
              <p><strong>Tanggal Masuk:</strong> {item.tanggalMasuk}</p>
              <p><strong>Status:</strong> {item.statusFull ? 'Full' : 'Belum Full'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
