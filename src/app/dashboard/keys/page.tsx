"use client";

import { useState, useEffect, useCallback } from "react";

interface ApiKeyData {
  id: string;
  name: string;
  key: string;
  keyPreview: string;
  active: boolean;
  createdAt: string;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKeyData[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadKeys = useCallback(() => {
    fetch("/api/keys")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setKeys(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  async function createKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName || "Default" }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewKey(data.key);
        setNewKeyName("");
        loadKeys();
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteKey(id: string) {
    if (!confirm("Are you sure you want to delete this API key?")) return;
    await fetch("/api/keys", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadKeys();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">API Keys</h1>
      <p className="text-zinc-400 mb-8">
        Create and manage your API keys for image generation.
      </p>

      {/* Create new key */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Create new key</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Key name (e.g., Production)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition"
          />
          <button
            onClick={createKey}
            disabled={loading}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Creating..." : "Create key"}
          </button>
        </div>
      </div>

      {/* Show newly created key */}
      {newKey && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-emerald-400 mb-2">
            Key created successfully!
          </h3>
          <p className="text-sm text-zinc-400 mb-3">
            Copy this key now. You won&apos;t be able to see the full key again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-emerald-300 break-all">
              {newKey}
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(newKey);
              }}
              className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition shrink-0"
            >
              Copy
            </button>
          </div>
          <button
            onClick={() => setNewKey(null)}
            className="text-sm text-zinc-500 mt-3 hover:text-zinc-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Key list */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        {keys.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No API keys yet. Create one above to get started.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="text-left p-4 font-semibold text-zinc-400">
                  Name
                </th>
                <th className="text-left p-4 font-semibold text-zinc-400">
                  Key
                </th>
                <th className="text-left p-4 font-semibold text-zinc-400">
                  Created
                </th>
                <th className="text-right p-4 font-semibold text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {keys.map((key) => (
                <tr key={key.id}>
                  <td className="p-4">{key.name}</td>
                  <td className="p-4 font-mono text-zinc-400 text-xs">
                    {key.keyPreview}
                  </td>
                  <td className="p-4 text-zinc-400">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
