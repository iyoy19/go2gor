"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { sidebarMenu as menu } from "@/config/sidebarMenu";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) setIsExpanded(false);
  }, [pathname, isMobile]);

  const noSidebarPaths = [
    "/users/team",
    "/users/activity",
    "/users/jadwal",
    "/users/pesan",
    "/users/undangan",
  ];
  const showSidebar = !noSidebarPaths.includes(pathname);

  const sidebarTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  const sidebarVariants: Variants = {
    collapsed: {
      width: isMobile ? "0px" : "80px",
      x: isMobile ? "-100%" : "0%",
      transition: sidebarTransition,
    },
    expanded: {
      width: isMobile ? "280px" : "280px",
      x: "0%",
      transition: sidebarTransition,
    },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0, pointerEvents: "none" },
    visible: { opacity: 1, pointerEvents: "auto" },
  };

  const itemVariants: Variants = {
    collapsed: {
      justifyContent: isMobile ? "flex-start" : "center",
      paddingLeft: isMobile ? "20px" : "12px",
      paddingRight: isMobile ? "20px" : "12px",
    },
    expanded: {
      justifyContent: "flex-start",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  };

  const labelVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
      display: "none",
    },
    visible: {
      opacity: 1,
      x: 0,
      display: "block",
      transition: { delay: 0.1, duration: 0.3 },
    },
  };

  const getItemColor = (index: number) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-yellow-500 to-orange-500",
      "from-indigo-500 to-purple-500",
      "from-pink-500 to-rose-500",
      "from-violet-500 to-indigo-500",
      "from-teal-500 to-green-500",
      "from-red-500 to-pink-500",
      "from-rose-500 to-red-500",
      "from-gray-600 to-gray-500",
    ];
    return colors[index % colors.length];
  };

  const handleMenuClick = (href: string) => {
    router.push(href);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  if (!showSidebar) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 md:p-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-2 relative">
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          className="fixed top-20 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-700" />
            )}
          </motion.div>
        </motion.button>
      )}

      {/* Mobile Overlay */}
      {isMobile && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>
      )}

      {/* Sidebar */}
      <motion.div
        className={`${
          isMobile
            ? "fixed left-0 top-0 h-full z-50 bg-white border-r border-gray-200"
            : "relative bg-transparent border-r border-gray-200/60"
        } overflow-hidden`}
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        onHoverStart={() => !isMobile && setIsExpanded(true)}
        onHoverEnd={() => !isMobile && setIsExpanded(false)}
      >
        {/* Menu Items */}
        <nav className="flex-1 pt-18 pb-4 overflow-y-auto">
          <div className="space-y-2 px-3">
            {menu.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const itemColor = getItemColor(index);

              return (
                <motion.button
                  key={item.href}
                  className={`w-full flex items-center py-3 rounded-2xl font-medium transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-r ${itemColor} shadow-lg text-white`
                      : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  }`}
                  variants={itemVariants}
                  onClick={() => handleMenuClick(item.href)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    ...(isExpanded || isMobile
                      ? {
                          justifyContent: "flex-start",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }
                      : {
                          justifyContent: isMobile ? "flex-start" : "center",
                          paddingLeft: isMobile ? "20px" : "12px",
                          paddingRight: isMobile ? "20px" : "12px",
                        }),
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Glow Effect for Active Items */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ boxShadow: "0 0 0px rgba(139,92,246,0)" }}
                      animate={{
                        boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{ rotate: 5 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    />
                  </motion.div>

                  {/* Label */}
                  <AnimatePresence>
                    {(isExpanded || isMobile) && (
                      <motion.span
                        className={`ml-4 relative z-10 whitespace-nowrap transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}
                        variants={labelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute right-3 w-2 h-2 bg-white rounded-full"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>
      </motion.div>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "p-6 pt-32" : "p-6 pt-18"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
