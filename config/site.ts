export const siteConfig = {
  name: "Go2Gor",
  linkname: "Go2Gor | Booking Lapangan Online",
  description: "Platform penyewaan lapangan dan komunitas olahraga.",
  navItems: [
    {
      label: "Beranda",
      dropdown: false,
      href: "/",
      icon: "home",
    },
    {
      label: "Booking",
      dropdown: true,
      icon: "calendar-clock",
      children: [
        { label: "Lapangan", href: "/lapangan", icon: "map-pin" },
        { label: "Jadwal", href: "/jadwal", icon: "clock" },
      ],
    },
    {
      label: "Komunitas",
      dropdown: true,
      icon: "users",
      children: [
        { label: "Forum", href: "/forum", icon: "message-circle" },
        { label: "Event", href: "/#event", icon: "calendar" }, // navigasi ke section Event di homepage
      ],
    },
  ],
  navMenuItems: [
    { label: "Kontak", href: "/kontak", icon: "phone" },
    { label: "Tentang", href: "/about", icon: "info" },
    { label: "Login", href: "/login", icon: "log-in" },
  ],
  links: {
    Login: "/login",
  },
};
