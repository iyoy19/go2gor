import {
  Activity,
  Building2,
  Calendar,
  CalendarDays,
  CalendarPlus,
  HelpCircle,
  Home,
  Image,
  LogOut,
  MailIcon,
  MessageCircle,
  MessageSquare,
  Settings,
  Info,
  Globe,
  Settings2,
  Trophy,
  User2,
  Users,
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
              key: "jadwal-saya",
              label: "Jadwal Saya",
              href: "/users/jadwal",
              icon: CalendarDays,
              description: "Pertandingan atau booking mendatang",
            },
            {
              key: "tim-saya",
              label: "Tim Saya",
              href: "/users/team",
              icon: Users,
              description: "Tim yang diikuti",
            },
            {
              key: "undangan",
              label: "Undangan",
              href: "/users/undangan",
              icon: MailIcon,
              description: "Email, password, foto profil",
            },
            {
              key: "notif",
              label: "Pesan",
              href: "/users/pesan",
              icon: MessageSquare,
              description: "Atur notifikasi",
            },
          ],
        },
        {
          key: "team",
          title: "Team",
          items: [
            {
              key: "aktivitas-riwayat",
              label: "Aktivitas & Riwayat",
              href: "/users/activity",
              icon: Activity,
              description: "Riwayat aktivitas",
            },
            {
              key: "pengaturan",
              label: "Pengaturan Akun",
              href: "/users/profile",
              icon: Settings2,
              description: "Email, password, foto profil",
            },
          ],
        },
        {
          key: "bantuan",
          title: "Bantuan",
          items: [
            {
              key: "about",
              label: "Tentang Web",
              icon: Info,
              description: "Info aplikasi, versi, developer",
              href: "/about",
            },
            {
              key: "language",
              label: "Bahasa / Language",
              href: "/users/Language",
              icon: Globe,
              description: "FAQ dan panduan",
            },
            {
              key: "help",
              label: "Pusat Bantuan",
              href: "/help",
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
