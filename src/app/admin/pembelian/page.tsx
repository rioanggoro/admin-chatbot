'use client';

import { useEffect, useState } from 'react';

type Produk = {
  id: number;
  nama: string;
  harga: number;
  stok?: { jumlah: number } | null;
};

export default function PembelianForm() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [produkId, setProdukId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('/api/produk')
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA PRODUK:', data);
        setProdukList(data);
      });
  }, []);

  useEffect(() => {
    const selected = produkList.find((p) => p.id === produkId);
    if (selected) {
      setTotal(selected.harga * qty);
    }
  }, [produkId, qty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produkId || qty <= 0) return alert('Pilih produk dan qty valid');

    const res = await fetch('/api/pembelian', {
      method: 'POST',
      body: JSON.stringify({ produkId, qty }),
    });

    if (res.ok) {
      alert('Pembelian berhasil!');
      setQty(1);
      setProdukId(null);
    } else {
      const data = await res.json();
      alert(data.error || 'Gagal melakukan pembelian');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Pembelian</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Pilih Produk</label>
          <select
            className="w-full border p-2"
            value={produkId ?? ''}
            onChange={(e) => setProdukId(Number(e.target.value))}
          >
            <option value="">-- Pilih Produk --</option>
            {produkList.map((produk) => (
              <option key={produk.id} value={produk.id}>
                {produk.nama} - Stok: {produk.stok?.jumlah ?? 0}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Jumlah</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border p-2"
          />
        </div>
        <div>
          <strong>Total Harga: </strong> Rp {total.toLocaleString()}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Beli
        </button>
      </form>
    </div>
  );
}
