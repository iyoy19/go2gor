"use client";

import { useState } from "react";
import {
  CreditCard,
  Wallet,
  DollarSign,
  Clock,
  Calendar,
  Plus,
  ArrowUpRight,
  Download,
} from "lucide-react";

type PaymentMethod = {
  id: string;
  type: "card" | "ewallet" | "bank";
  name: string;
  lastUsed: string;
  details: string;
  isDefault: boolean;
};

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "success" | "pending" | "failed";
  method: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    name: "Visa",
    lastUsed: "2 hari yang lalu",
    details: "**** **** **** 1234",
    isDefault: true,
  },
  {
    id: "2",
    type: "ewallet",
    name: "GoPay",
    lastUsed: "1 minggu yang lalu",
    details: "088123456789",
    isDefault: false,
  },
  {
    id: "3",
    type: "bank",
    name: "Bank Transfer",
    lastUsed: "1 bulan yang lalu",
    details: "BCA - 1234567890",
    isDefault: false,
  },
];

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2025-09-03",
    description: "Booking Lapangan - 2 Jam",
    amount: 200000,
    status: "success",
    method: "Visa",
  },
  {
    id: "2",
    date: "2025-09-01",
    description: "Tournament Registration Fee",
    amount: 500000,
    status: "success",
    method: "GoPay",
  },
  {
    id: "3",
    date: "2025-08-28",
    description: "Booking Lapangan - 1 Jam",
    amount: 100000,
    status: "pending",
    method: "Bank Transfer",
  },
];

export default function PaymentPage() {
  const [selectedTab, setSelectedTab] = useState<"methods" | "history">(
    "methods"
  );

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
        <p className="text-gray-600">
          Kelola metode pembayaran dan lihat riwayat transaksi Anda
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedTab("methods")}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === "methods"
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Metode Pembayaran
        </button>
        <button
          onClick={() => setSelectedTab("history")}
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === "history"
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Riwayat Transaksi
        </button>
      </div>

      {selectedTab === "methods" && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      {method.type === "card" ? (
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                      ) : method.type === "ewallet" ? (
                        <Wallet className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-500">{method.details}</p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="px-2.5 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Terakhir digunakan: {method.lastUsed}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
                    Edit
                  </button>
                  <button className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            {/* Add New Payment Method Card */}
            <button className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-gray-500 hover:text-gray-600 hover:border-gray-300 transition-colors">
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">
                Tambah Metode Pembayaran
              </span>
            </button>
          </div>
        </div>
      )}

      {selectedTab === "history" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Transaction History */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metode
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(transaction.date).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Rp {transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === "success"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status === "success"
                          ? "Berhasil"
                          : transaction.status === "pending"
                            ? "Menunggu"
                            : "Gagal"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end space-x-3">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
