import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/produk" className="block hover:text-blue-400">
            📦 Produk
          </Link>
          <Link href="/admin/pembelian" className="block hover:text-blue-400">
            🛒 Form Pembelian
          </Link>
          <Link
            href="/admin/pembelian/history"
            className="block hover:text-blue-400"
          >
            📃 Riwayat Pembelian
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
