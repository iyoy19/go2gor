export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="p-4 bg-gray-900 text-white text-center text-2xl font-bold">
        Profile Section
      </header>
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
