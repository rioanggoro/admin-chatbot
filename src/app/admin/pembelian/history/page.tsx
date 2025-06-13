'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Pembelian = {
  id: number;
  produk: { nama: string };
  qty: number;
  totalHarga: number;
  status: string;
  createdAt: string;
};

export default function RiwayatPembelian() {
  const [data, setData] = useState<Pembelian[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchData = () => {
    setIsLoading(true);
    fetch('/api/pembelian')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (id: number) => {
    setSelectedId(id);
    setShowDialog(true);
  };

  const handleCancel = async () => {
    if (!selectedId) return;
    const res = await fetch('/api/pembelian', {
      method: 'PATCH',
      body: JSON.stringify({ id: selectedId }),
    });

    if (res.ok) {
      fetchData();
    } else {
      alert('Gagal membatalkan');
    }
    setShowDialog(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        📃 Riwayat Pembelian
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div role="status" className="flex flex-col items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 
                50 100.591C22.3858 100.591 0 78.2051 
                0 50.5908C0 22.9766 22.3858 0.59082 
                50 0.59082C77.6142 0.59082 100 22.9766 
                100 50.5908ZM9.08144 50.5908C9.08144 
                73.1895 27.4013 91.5094 50 91.5094C72.5987 
                91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 
                27.9921 72.5987 9.67226 50 9.67226C27.4013 
                9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 
                35.9116 97.0079 33.5539C95.2932 28.8227 
                92.871 24.3692 89.8167 20.348C85.8452 
                15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
                4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
                0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 
                1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
                9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 
                9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 
                10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
                17.9648 79.3347 21.5619 82.5849 25.841C84.9175 
                28.9121 86.7997 32.2913 88.1811 35.8758C89.083 
                38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Memuat data pembelian...
            </span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
          <table className="min-w-full text-sm text-slate-800 dark:text-slate-100">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Produk</th>
                <th className="px-4 py-3 text-left">Jumlah</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-slate-500 dark:text-slate-400 py-6"
                  >
                    Tidak ada riwayat pembelian.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{item.produk.nama}</td>
                    <td className="px-4 py-3">{item.qty}</td>
                    <td className="px-4 py-3">
                      Rp {item.totalHarga.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full
                        ${
                          item.status === 'berhasil'
                            ? 'bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-800/30 dark:text-red-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.status === 'berhasil' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleOpenDialog(item.id)}
                        >
                          Batalkan
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog Konfirmasi */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Batalkan Pembelian?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak dapat dibatalkan. Lanjutkan?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Ya, Batalkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
