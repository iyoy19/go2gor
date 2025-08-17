import {
  Home,
  Trophy,
  Building2,
  CalendarDays,
  CalendarPlus,
  Users,
  Settings,
  MessageCircle,
  Calendar,
  Image,
  User2,
  UserCircle,
  Settings2,
  Bell,
  ClipboardList,
  Activity,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { NavItem } from "@/components/Navbar";

interface SiteConfig {
  name: string;
  linkname: string;
  description: string;
  navItems: NavItem[];
  links: {
    Login: string;
    Booking: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Go2Gor",
  linkname: "Go2Gor | Booking Lapangan Online",
  description: "Platform penyewaan lapangan dan komunitas olahraga.",
  navItems: [
    {
      key: "home",
      label: "Home",
      dropdown: false,
      href: "/",
      icon: Home,
    },
    {
      key: "match",
      label: "Match",
      dropdown: true,
      icon: Trophy,
      children: [
        {
          key: "match-group",
          title: "Pertandingan",
          items: [
            {
              key: "jadwal",
              label: "Jadwal Pertandingan",
              href: "/jadwal",
              icon: CalendarDays,
              description: "Lihat jadwal pertandingan",
            },
            {
              key: "booking",
              label: "Booking Lapangan",
              href: "/booking",
              icon: CalendarPlus,
              description: "Pesan lapangan untuk pertandingan",
            },
            {
              key: "team",
              label: "Team Match",
              href: "/team",
              icon: Users,
              description: "Daftar tim yang bertanding",
            },
          ],
        },
      ],
    },
    {
      key: "arena",
      label: "Arena",
      dropdown: true,
      icon: Building2,
      children: [
        {
          key: "arena-group",
          title: "Informasi Arena",
          items: [
            {
              key: "daftar-lapangan",
              label: "Daftar Lapangan",
              href: "/lapangan",
              icon: Building2,
              description: "Lihat semua lapangan tersedia",
            },
            {
              key: "fasilitas",
              label: "Fasilitas",
              href: "/fasilitas",
              icon: Settings,
              description: "Fasilitas yang tersedia",
            },
          ],
        },
      ],
    },
    {
      key: "komunitas",
      label: "Komunitas",
      dropdown: true,
      icon: Users,
      children: [
        {
          key: "komunitas-group",
          title: "Aktivitas Komunitas",
          items: [
            {
              key: "forum",
              label: "Forum",
              href: "/forum",
              icon: MessageCircle,
              description: "Diskusi dengan komunitas",
            },
            {
              key: "event",
              label: "Event",
              href: "/event",
              icon: Calendar,
              description: "Event komunitas mendatang",
            },
            {
              key: "galeri",
              label: "Galeri",
              href: "/galeri",
              icon: Image,
              description: "Galeri foto komunitas",
            },
          ],
        },
      ],
    },

    {
      key: "profile",
      label: "Profile",
      dropdown: true,
      icon: User2,
      children: [
        {
          key: "profil",
          title: "Profil",
          items: [
            {
              key: "profil-saya",
              label: "Profil Saya",
              href: "/profile", // tetap /profile
              icon: UserCircle,
              description: "Lihat & edit data diri",
            },
            {
              key: "pengaturan",
              label: "Pengaturan Akun",
              href: "/pengaturan", // tanpa /profile
              icon: Settings2,
              description: "Email, password, foto profil",
            },
            {
              key: "notif",
              label: "Preferensi Notifikasi",
              href: "/notifikasi", // tanpa /profile
              icon: Bell,
              description: "Atur notifikasi",
            },
          ],
        },

        {
          key: "aktivitas",
          title: "Aktivitas",
          items: [
            {
              key: "jadwal-saya",
              label: "Jadwal Saya",
              href: "/jadwal-saya",
              icon: CalendarDays,
              description: "Pertandingan atau booking mendatang",
            },
            {
              key: "aktivitas-riwayat",
              label: "Aktivitas & Riwayat",
              href: "/aktivitas",
              icon: Activity,
              description: "Riwayat aktivitas",
            },
          ],
        },

        {
          key: "riwayat",
          title: "Riwayat",
          items: [
            {
              key: "riwayat-booking",
              label: "Riwayat Booking",
              href: "/booking",
              icon: ClipboardList,
              description: "Lapangan yang pernah dibooking",
            },
          ],
        },

        {
          key: "team",
          title: "Team",
          items: [
            {
              key: "tim-saya",
              label: "Tim Saya",
              href: "/team",
              icon: Users,
              description: "Tim yang diikuti",
            },
          ],
        },

        {
          key: "bantuan",
          title: "Bantuan",
          items: [
            {
              key: "help",
              label: "Pusat Bantuan",
              href: "/bantuan",
              icon: HelpCircle,
              description: "FAQ dan panduan",
            },
            {
              key: "logout",
              label: "Logout",
              href: "/logout",
              icon: LogOut,
              color: "danger",
            },
          ],
        },
      ],
    },
  ],
  links: {
    Login: "/login",
    Booking: "/booking",
  },
};
