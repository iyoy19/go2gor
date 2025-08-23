import {
  UserCircle,
  Settings2,
  Lock,
  LayoutDashboard,
  Globe,
  Bell,
  CreditCard,
  HelpCircle,
  Info,
} from "lucide-react";

export const sidebarMenu = [
  {
    label: "Profil Saya",
    icon: UserCircle,
    description: "Lihat & edit detail profil user",
    href: "/users/profile",
  },
  {
    label: "Pengaturan Akun",
    icon: Settings2,
    description: "Atur akun (email, password, preferensi dasar)",
    href: "/users/profile/settings",
  },
  {
    label: "Keamanan & Login",
    icon: Lock,
    description: "Atur password, perangkat login, 2FA",
    href: "/users/profile/security",
  },
  {
    key: "notif",
    label: "Preferensi Notifikasi",
    href: "/users/profile/notifikasi",
    icon: Bell,
    description: "Atur notifikasi",
  },
  {
    label: "Pembayaran & Tagihan",
    icon: CreditCard,
    description: "Kelola saldo, metode pembayaran, tagihan",
    href: "/users/profile/payment",
  },
  {
    label: "Hubungi kami",
    icon: HelpCircle,
    description: "FAQ, panduan, hubungi support",
    href: "/users/profile/kontak",
  },
];
