'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Loader2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type Produk = {
  id: number;
  nama: string;
  harga: number;
  stok?: { jumlah: number } | null;
  deskripsi?: string;
};

export default function PembelianForm() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [produkId, setProdukId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Get selected product details
  const selectedProduct = produkList.find((p) => p.id === produkId);
  const maxStock = selectedProduct?.stok?.jumlah || 0;

  useEffect(() => {
    fetch('/api/produk')
      .then((res) => res.json())
      .then((data) => {
        setProdukList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError('Gagal memuat data produk');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const selected = produkList.find((p) => p.id === produkId);
    if (selected) {
      setTotal(selected.harga * qty);
    } else {
      setTotal(0);
    }
  }, [produkId, qty, produkList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produkId || qty <= 0) {
      setError('Pilih produk dan masukkan jumlah yang valid');
      return;
    }

    if (qty > maxStock) {
      setError(`Stok tidak mencukupi. Maksimal pembelian: ${maxStock}`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/pembelian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produkId, qty }),
      });

      if (res.ok) {
        setSuccess(true);
        setQty(1);
        setProdukId(null);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal melakukan pembelian');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memproses pembelian');
    } finally {
      setIsSubmitting(false);
    }
  };

  const incrementQty = () => {
    if (maxStock && qty >= maxStock) return;
    setQty((prev) => prev + 1);
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ShoppingBag size={24} />
              </div>
              <div>
                <CardTitle className="text-2xl">Form Pembelian</CardTitle>
                <CardDescription className="text-blue-100 mt-1">
                  Pilih produk dan jumlah yang ingin dibeli
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product" className="text-sm font-medium">
                    Pilih Produk
                  </Label>
                  <Select
                    value={produkId?.toString() || ''}
                    onValueChange={(value) => setProdukId(Number(value))}
                  >
                    <SelectTrigger id="product" className="w-full">
                      <SelectValue placeholder="-- Pilih Produk --" />
                    </SelectTrigger>
                    <SelectContent>
                      {produkList.map((produk) => (
                        <SelectItem
                          key={produk.id}
                          value={produk.id.toString()}
                          disabled={
                            !produk.stok?.jumlah || produk.stok.jumlah <= 0
                          }
                        >
                          {produk.nama}{' '}
                          {produk.stok?.jumlah
                            ? `(Stok: ${produk.stok.jumlah})`
                            : '(Stok Habis)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProduct && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-white">
                          {selectedProduct.nama}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {selectedProduct.deskripsi ||
                            'Tidak ada deskripsi produk'}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Rp {selectedProduct.harga.toLocaleString()}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            Stok: {selectedProduct.stok?.jumlah || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Jumlah
                  </Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decrementQty}
                      disabled={qty <= 1 || !selectedProduct}
                      className="rounded-r-none"
                    >
                      <Minus size={16} />
                    </Button>
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      max={maxStock}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="h-10 w-16 text-center border-y border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={incrementQty}
                      disabled={
                        !selectedProduct || (maxStock > 0 && qty >= maxStock)
                      }
                      className="rounded-l-none"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-md text-sm flex items-center gap-2"
                  >
                    <Check size={16} />
                    <span>Pembelian berhasil!</span>
                  </motion.div>
                )}
              </form>
            )}
          </CardContent>

          {!isLoading && (
            <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Harga
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Rp {total.toLocaleString()}
                </p>
              </div>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={
                  isSubmitting || !produkId || qty <= 0 || qty > maxStock
                }
                className="w-full sm:w-auto min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Beli Sekarang</span>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
