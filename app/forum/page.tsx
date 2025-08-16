"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaSearch,
  FaRegCommentDots,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
import { forumPosts, ForumPost } from "../../data/forumPosts";

export default function ForumPage() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<ForumPost[]>(forumPosts);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showForm, setShowForm] = useState(false);
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPosts(
      forumPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          post.content.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    setPosts([
      {
        id: posts.length + 1,
        author: "Guest User",
        avatar: "",
        title: newPost.title,
        content: newPost.content,
        date: new Date().toISOString().slice(0, 10),
        comments: [],
        likes: 0,
        dislikes: 0,
        tags: [],
      },
      ...posts,
    ]);
    setNewPost({ title: "", content: "" });
    setShowForm(false);
  };

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  const handleDislike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post,
      ),
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 md:px-16 mt-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Forum Komunitas
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Cari topik..."
                value={search}
                onChange={handleSearch}
                className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-sm text-sm sm:text-base"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow text-sm sm:text-base whitespace-nowrap"
            >
              + Buat Topik
            </button>
          </div>
        </div>

        {/* Form Buat Topik Baru */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-green-100 animate-fade-in">
            <form onSubmit={handleAddPost}>
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Judul Topik"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  placeholder="Tulis pertanyaan atau diskusi..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[100px]"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                >
                  Posting
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar Post */}
        <div className="space-y-6">
          {posts.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              Tidak ada topik ditemukan.
            </div>
          )}
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                {post.avatar ? (
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 sm:w-9 sm:h-9 text-gray-400 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-gray-700 group-hover:text-green-600 transition-colors truncate">
                    {post.author}
                  </div>
                  <div className="text-xs text-gray-400">{post.date}</div>
                </div>
              </div>
              <div className="mb-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-none">
                  {post.content}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 sm:gap-6 mt-2 text-gray-500">
                {/* Comments */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenCommentId(openCommentId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600 focus:outline-none"
                >
                  <FaRegCommentDots />
                  <span className="text-sm">{post.comments?.length ?? 0}</span>
                </button>

                {/* Likes */}
                <button
                  type="button"
                  onClick={() => handleLike(post.id)} // <- tinggal bikin fungsi handleLike
                  className="flex items-center gap-1 cursor-pointer hover:text-green-600 focus:outline-none"
                >
                  <FaRegThumbsUp />
                  <span className="text-sm">{post.likes ?? 0}</span>
                </button>

                {/* Dislikes */}
                <button
                  type="button"
                  onClick={() => handleDislike(post.id)} // <- tinggal bikin fungsi handleDislike
                  className="flex items-center gap-1 cursor-pointer hover:text-red-500 focus:outline-none"
                >
                  <FaRegThumbsDown />
                  <span className="text-sm">{post.dislikes ?? 0}</span>
                </button>
              </div>
              {/* Komentar Expandable Section */}
              {openCommentId === post.id && (
                <div className="w-full bg-gray-50 border border-gray-200 rounded-lg shadow-inner p-3 sm:p-4 mt-3 sm:mt-4 animate-fade-in max-h-64 sm:max-h-72 overflow-y-auto">
                  <div className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">
                    Komentar
                  </div>
                  {post.comments.length === 0 ? (
                    <div className="text-gray-400 text-xs sm:text-sm mb-2">
                      Belum ada komentar.
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col gap-3 mb-2">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex gap-2 items-start"
                          >
                            <FaUserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-700 text-xs sm:text-sm">
                                {comment.author}
                              </div>
                              <div className="text-xs text-gray-400 mb-1">
                                {comment.date}
                              </div>
                              <div className="text-gray-600 text-xs sm:text-sm mb-2">
                                {comment.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="text-green-600 hover:underline text-xs font-semibold px-2 py-1 rounded"
                      >
                        Balas
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
