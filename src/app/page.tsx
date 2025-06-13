'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState({
    totalProduk: 0,
    totalPembelian: 0,
    totalBatal: 0,
    totalStok: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Ringkasan Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Produk" value={data.totalProduk} />
        <Card title="Pembelian" value={data.totalPembelian} />
        <Card title="Dibatalkan" value={data.totalBatal} />
        <Card title="Total Stok" value={data.totalStok} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gray-800 p-5 rounded shadow text-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-400">{value}</p>
    </div>
  );
}
