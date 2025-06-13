import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const produk = await prisma.produk.findMany({
    include: { stok: true },
  });
  return NextResponse.json(produk);
}
