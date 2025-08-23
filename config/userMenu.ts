import {
  UserCircle,
  Settings2,
  Bell,
  CalendarDays,
  Activity,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";

export const menu = [
  { href: "/users/profile", label: "Profil Saya", icon: UserCircle },
  { href: "/users/settings", label: "Pengaturan Akun", icon: Settings2 },
  { href: "/users/notifikasi", label: "Preferensi Notifikasi", icon: Bell },
  { href: "/users/jadwal", label: "Jadwal Saya", icon: CalendarDays },
  { href: "/users/activity", label: "Aktivitas & Riwayat", icon: Activity },
  { href: "/users/team", label: "Tim Saya", icon: Users },
  { href: "/users/bantuan", label: "Pusat Bantuan", icon: HelpCircle },
  { href: "/users/logout", label: "Logout", icon: LogOut },
];
