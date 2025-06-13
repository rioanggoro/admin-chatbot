'use client';

import { useEffect, useState } from 'react';

type Pembelian = {
  id: number;
  produk: {
    nama: string;
  };
  qty: number;
  totalHarga: number;
  status: string;
  createdAt: string;
};

export default function RiwayatPembelian() {
  const [data, setData] = useState<Pembelian[]>([]);

  const fetchData = () =>
    fetch('/api/pembelian')
      .then((res) => res.json())
      .then((d) => setData(d));

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (id: number) => {
    const confirm = window.confirm('Batalkan pembelian ini?');
    if (!confirm) return;

    const res = await fetch('/api/pembelian', {
      method: 'PATCH',
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert('Pembatalan berhasil');
      fetchData();
    } else {
      alert('Gagal batal');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pembelian</h1>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Produk</th>
            <th className="border p-2">Jumlah</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{item.produk.nama}</td>
              <td className="border p-2 text-center">{item.qty}</td>
              <td className="border p-2">
                Rp {item.totalHarga.toLocaleString()}
              </td>
              <td className="border p-2 capitalize">{item.status}</td>
              <td className="border p-2 text-center">
                {item.status === 'berhasil' && (
                  <button
                    onClick={() => handleCancel(item.id)}
                    className="text-red-500 underline"
                  >
                    Batalkan
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
