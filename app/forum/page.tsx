"use client";

import { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiArrowUp,
  FiArrowDown,
  FiPlus,
  FiX,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import Image from "next/image";

type User = {
  name: string;
  avatar: string;
};

type Post = {
  id: number;
  user: User;
  title: string;
  content: string;
  category: string;
  votes: number;
  comments: number;
  createdAt: string;
};

const dummyUser: User = {
  name: "Kamu",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
};

const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "Futsalholic",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
    },
    title: "Cari tim buat tanding futsal weekend ini, ada yang siap?",
    content:
      "Tim kami (5 orang) lagi cari lawan tanding buat hari Sabtu atau Minggu sore di daerah Jakarta Selatan. Level medium, yang penting seru dan keringetan bareng! Ada yang minat?",
    category: "Cari Lawan",
    votes: 125,
    comments: 42,
    createdAt: "2 jam lalu",
  },
  {
    id: 2,
    user: {
      name: "ShuttlecockMaster",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026702d",
    },
    title: "Tips smash badminton biar lebih kenceng gimana ya?",
    content:
      "Udah coba berbagai teknik tapi smash-ku masih kurang bertenaga. Ada senior di sini yang mau bagi-bagi ilmu? Mungkin dari posisi kaki atau ayunan tangan? Thank you!",
    category: "Badminton",
    votes: 98,
    comments: 28,
    createdAt: "5 jam lalu",
  },
  {
    id: 3,
    user: {
      name: "TournamentHunter",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    },
    title: "[INFO] Turnamen Futsal Go2Gor Cup 2025, Hadiah Jutaan Rupiah!",
    content:
      "Go2Gor bakal ngadain turnamen futsal besar-besaran bulan depan! Pendaftaran udah dibuka, slot terbatas. Yuk siapin tim kalian dari sekarang. Info lengkap ada di poster ya.",
    category: "Info Turnamen",
    votes: 210,
    comments: 76,
    createdAt: "1 hari lalu",
  },
  {
    id: 4,
    user: {
      name: "GripRaket",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    title: "Rekomendasi raket badminton untuk pemula budget 500rb?",
    content:
      "Baru mau mulai main badminton nih, bingung pilih raket. Ada saran raket yang bagus buat pemula, enteng, dan enak buat kontrol? Budget sekitar 500ribuan. Makasih!",
    category: "Badminton",
    votes: 72,
    comments: 31,
    createdAt: "2 hari lalu",
  },
];

const categories = [
  "Semua",
  "Futsal",
  "Badminton",
  "Info Turnamen",
  "Cari Lawan",
];

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = posts.filter(
    (post) => activeCategory === "Semua" || post.category === activeCategory
  );

  const handleCreatePost = (
    newPost: Omit<Post, "id" | "user" | "votes" | "comments" | "createdAt">
  ) => {
    const post: Post = {
      ...newPost,
      id: posts.length + 1,
      user: dummyUser,
      votes: 0,
      comments: 0,
      createdAt: "Baru saja",
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Forum Komunitas
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg shadow-indigo-500/30"
          >
            <FiPlus />
            <span>Postingan Baru</span>
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${activeCategory === category ? "bg-white text-gray-900" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Post List */}
        <motion.div className="space-y-5">
          <AnimatePresence>
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 flex gap-5 hover:border-indigo-500/50 transition-colors duration-300">
      {/* Votes */}
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="hover:text-indigo-400"
        >
          <FiArrowUp size={20} />
        </motion.button>
        <span className="font-bold text-lg text-white">{post.votes}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="hover:text-blue-400"
        >
          <FiArrowDown size={20} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-semibold text-sm text-gray-300">
            Diposting oleh {post.user.name}
          </span>
          <span className="text-xs text-gray-500">• {post.createdAt}</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 leading-tight">
          {post.title}
        </h2>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="flex items-center gap-1.5 text-sm">
              <FiMessageSquare />
              <span>{post.comments} Komentar</span>
            </div>
            <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatePostModal = ({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    post: Omit<Post, "id" | "user" | "votes" | "comments" | "createdAt">
  ) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[1]);

  const handleSubmit = () => {
    if (!title || !content) return;
    onCreate({ title, content, category });
    setTitle("");
    setContent("");
    setCategory(categories[1]);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-6 sm:p-8 border border-gray-700/80 my-4 sm:my-10"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Buat Postingan Baru
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Judul Postingan..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <textarea
                placeholder="Apa yang kamu pikirkan?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              />
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  {categories
                    .filter((c) => c !== "Semua")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg shadow-indigo-500/30 disabled:bg-gray-600 disabled:shadow-none"
                disabled={!title || !content}
              >
                Publikasikan
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
