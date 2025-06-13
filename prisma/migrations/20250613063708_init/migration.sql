-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockProduk" (
    "id" SERIAL NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "produkId" INTEGER NOT NULL,

    CONSTRAINT "StockProduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" SERIAL NOT NULL,
    "produkId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "totalHarga" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'berhasil',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockProduk_produkId_key" ON "StockProduk"("produkId");

-- AddForeignKey
ALTER TABLE "StockProduk" ADD CONSTRAINT "StockProduk_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
