import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const totalProduk = await prisma.produk.count();
  const totalPembelian = await prisma.pembelian.count();
  const totalBatal = await prisma.pembelian.count({
    where: { status: 'batal' },
  });
  const totalStok = await prisma.stockProduk.aggregate({
    _sum: { jumlah: true },
  });

  return NextResponse.json({
    totalProduk,
    totalPembelian,
    totalBatal,
    totalStok: totalStok._sum.jumlah ?? 0,
  });
}
