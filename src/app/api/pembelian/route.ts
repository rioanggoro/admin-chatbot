import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { produkId, qty } = body;

  // Ambil data produk & stok
  const produk = await prisma.produk.findUnique({
    where: { id: produkId },
    include: { stok: true },
  });

  if (!produk || !produk.stok || produk.stok.jumlah < qty) {
    return NextResponse.json({ error: 'Stok tidak cukup' }, { status: 400 });
  }

  const totalHarga = produk.harga * qty;

  // Simpan pembelian
  const pembelian = await prisma.pembelian.create({
    data: {
      produkId,
      qty,
      totalHarga,
    },
  });

  // Kurangi stok
  await prisma.stockProduk.update({
    where: { produkId },
    data: {
      jumlah: produk.stok.jumlah - qty,
    },
  });

  return NextResponse.json({ success: true, pembelian });
}

export async function GET() {
  const prisma = new PrismaClient();
  const pembelian = await prisma.pembelian.findMany({
    include: {
      produk: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(pembelian);
}

export async function PATCH(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json();
  const { id } = body;

  const pembelian = await prisma.pembelian.findUnique({
    where: { id },
    include: { produk: { include: { stok: true } } },
  });

  if (!pembelian || pembelian.status === 'batal') {
    return NextResponse.json({ error: 'Tidak valid' }, { status: 400 });
  }

  // Update status
  await prisma.pembelian.update({
    where: { id },
    data: { status: 'batal' },
  });

  // Tambahkan stok kembali
  await prisma.stockProduk.update({
    where: { produkId: pembelian.produkId },
    data: {
      jumlah: pembelian.produk.stok!.jumlah + pembelian.qty,
    },
  });

  return NextResponse.json({ success: true });
}
