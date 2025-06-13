const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const produkList = [
    { nama: 'Kipas Angin', harga: 120000 },
    { nama: 'Setrika', harga: 150000 },
    { nama: 'Rice Cooker', harga: 300000 },
    { nama: 'TV LED', harga: 2500000 },
    { nama: 'Meja Belajar', harga: 500000 },
    { nama: 'Kursi Gaming', harga: 1500000 },
    { nama: 'AC Portable', harga: 2000000 },
    { nama: 'Mesin Cuci', harga: 2200000 },
    { nama: 'Kulkas 2 Pintu', harga: 3500000 },
    { nama: 'Speaker Bluetooth', harga: 250000 },
  ];

  for (const p of produkList) {
    const created = await prisma.produk.create({
      data: {
        nama: p.nama,
        harga: p.harga,
        stok: {
          create: {
            jumlah: 10,
          },
        },
      },
    });
    console.log(`Created: ${created.nama}`);
  }
}

main().finally(() => prisma.$disconnect());
