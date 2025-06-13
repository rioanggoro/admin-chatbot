'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  AlertCircle,
  Package2,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Search,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Sidebar from '@/components/admin/Sidebar';

export default function Dashboard() {
  const [data, setData] = useState({
    totalProduk: 0,
    totalPembelian: 0,
    totalBatal: 0,
    totalStok: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Failed to load dashboard data:', err));
  }, []);
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon">
              <LayoutDashboard className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">AdminPanel</h2>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 w-72">
            <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              type="text"
              placeholder="Cari..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Ringkasan data dan statistik terbaru
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Filter
                </Button>
                <Button size="sm">Unduh Laporan</Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Produk"
                value={data.totalProduk}
                icon={<Package2 />}
                trend="up"
                percent={12}
                color="blue"
              />
              <StatsCard
                title="Total Pembelian"
                value={data.totalPembelian}
                icon={<ShoppingCart />}
                trend="up"
                percent={8}
                color="green"
              />
              <StatsCard
                title="Dibatalkan"
                value={data.totalBatal}
                icon={<AlertCircle />}
                trend="down"
                percent={3}
                color="red"
              />
              <StatsCard
                title="Total Stok"
                value={data.totalStok}
                icon={<Package />}
                trend="up"
                percent={5}
                color="purple"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, trend, percent, color }) {
  const colorClasses = {
    blue: {
      light: 'bg-blue-50 text-blue-600',
      dark: 'bg-blue-600',
      text: 'text-blue-600 dark:text-blue-400',
      trend: {
        up: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20',
        down: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
      },
    },
    green: {
      light: 'bg-green-50 text-green-600',
      dark: 'bg-green-600',
      text: 'text-green-600 dark:text-green-400',
      trend: {
        up: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
        down: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
      },
    },
    red: {
      light: 'bg-red-50 text-red-600',
      dark: 'bg-red-600',
      text: 'text-red-600 dark:text-red-400',
      trend: {
        up: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
        down: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
      },
    },
    purple: {
      light: 'bg-purple-50 text-purple-600',
      dark: 'bg-purple-600',
      text: 'text-purple-600 dark:text-purple-400',
      trend: {
        up: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
        down: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
      },
    },
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color].light} dark:bg-opacity-20`}
          >
            {React.cloneElement(icon, { className: 'h-6 w-6' })}
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              trend === 'up'
                ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {percent}%
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </h3>
          <p className={`text-2xl font-bold mt-1 ${colorClasses[color].text}`}>
            {value.toLocaleString()}
          </p>
        </div>

        <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${colorClasses[color].dark}`}
            style={{ width: `${Math.min(100, percent * 5)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
