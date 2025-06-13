'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar from '@/components/admin/Sidebar';
export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message };
    setChat((prev) => [...prev, newMessage]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setChat((prev) => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setChat((prev) => [
        ...prev,
        { role: 'ai', content: '❌ Gagal mendapatkan respon dari server.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Content */}
      <main className="flex-1 p-6">
        <Card className="max-w-2xl mx-auto p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
            🤖 Chatbot Gemini
          </h2>

          <ScrollArea className="h-[300px] border rounded p-3 space-y-2 mb-4 bg-white dark:bg-slate-800">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`text-sm ${
                  c.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded ${
                    c.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 dark:text-white'
                  }`}
                >
                  {c.content}
                </span>
              </div>
            ))}
            {loading && (
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
                ⏳ Mengetik...
              </p>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pertanyaan..."
            />
            <Button type="submit" disabled={loading}>
              Kirim
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
