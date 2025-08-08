#!/bin/bash

declare -A pages=(
  [about]="from-indigo-500 via-purple-500 to-pink-500"
  [event]="from-green-400 via-blue-500 to-purple-600"
  [forum]="from-yellow-400 via-red-500 to-pink-500"
  [jadwal]="from-red-400 via-pink-500 to-purple-500"
  [kontak]="from-teal-400 via-lime-500 to-green-400"
  [lapangan]="from-orange-400 via-yellow-500 to-pink-400"
  [login]="from-gray-700 via-gray-900 to-black"
  [register]="from-pink-500 via-purple-500 to-indigo-500"
)

for page in "${!pages[@]}"; do
  bg="${pages[$page]}"
  path="app/$page/page.tsx"
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<EOF_PAGE
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br $bg">
      <h1 className="text-4xl font-bold">Halaman ${page^}</h1>
    </div>
  );
}
EOF_PAGE
  echo "✔️  Updated: $path"
done
