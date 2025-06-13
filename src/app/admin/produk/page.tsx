'use client';

import { useEffect, useState } from 'react';

type Produk = {
  id: number;
  nama: string;
  harga: number;
  stok?: {
    jumlah: number;
  } | null;
};

export default function ProdukAdminPage() {
  const [produk, setProduk] = useState<Produk[]>([]);

  useEffect(() => {
    fetch('/api/produk')
      .then((res) => res.json())
      .then((data) => setProduk(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Nama Produk</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Stok</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item, i) => (
            <tr key={item.id}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{item.nama}</td>
              <td className="border p-2">Rp {item.harga.toLocaleString()}</td>
              <td className="border p-2 text-center">
                {item.stok?.jumlah ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
