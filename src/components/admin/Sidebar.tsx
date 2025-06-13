'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      href: '/',
    },
    {
      label: 'Produk',
      icon: <Package className="h-4 w-4" />,
      href: '/admin/produk',
    },
    {
      label: 'Form Pembelian',
      icon: <ShoppingCart className="h-4 w-4" />,
      href: '/admin/pembelian',
    },
    {
      label: 'Riwayat',
      icon: <Users className="h-4 w-4" />,
      href: '/admin/pembelian/history',
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'relative h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 z-10"
        >
          {collapsed ? (
            <ChevronRight
              size={16}
              className="text-slate-600 dark:text-slate-400"
            />
          ) : (
            <ChevronLeft
              size={16}
              className="text-slate-600 dark:text-slate-400"
            />
          )}
        </button>

        {/* Logo */}
        <div
          className={cn(
            'flex items-center h-16 border-b border-slate-200 dark:border-slate-700',
            collapsed ? 'justify-center px-2' : 'px-4'
          )}
        >
          <div className="bg-blue-600 text-white p-1 rounded flex items-center justify-center">
            <LayoutDashboard size={18} />
          </div>
          {!collapsed && (
            <h2 className="ml-2 text-lg font-bold text-slate-800 dark:text-white truncate">
              AdminPanel
            </h2>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return collapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} className="block">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'w-full h-10',
                        isActive
                          ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-400'
                      )}
                    >
                      {item.icon}
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link href={item.href} key={item.href} className="block">
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start h-10',
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div
          className={cn(
            'absolute bottom-0 w-full border-t border-slate-200 dark:border-slate-700 p-2',
            collapsed ? 'px-2' : 'px-4'
          )}
        >
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full h-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Keluar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Keluar</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start h-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Keluar
            </Button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
