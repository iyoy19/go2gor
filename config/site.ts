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
  Activity,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { NavItem } from "@/types";

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
              href: "/users/profile",
              icon: UserCircle,
              description: "Lihat & edit data diri",
            },
            {
              key: "pengaturan",
              label: "Pengaturan Akun",
              href: "/users/settings",
              icon: Settings2,
              description: "Email, password, foto profil",
            },
            {
              key: "notif",
              label: "Preferensi Notifikasi",
              href: "/users/notifikasi",
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
              href: "/users/jadwal",
              icon: CalendarDays,
              description: "Pertandingan atau booking mendatang",
            },
            {
              key: "aktivitas-riwayat",
              label: "Aktivitas & Riwayat",
              href: "/users/activity",
              icon: Activity,
              description: "Riwayat aktivitas",
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
              href: "/users/team",
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
              href: "/users/bantuan",
              icon: HelpCircle,
              description: "FAQ dan panduan",
            },
            {
              key: "logout",
              label: "Logout",
              href: "/users/logout",
              icon: LogOut,
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
