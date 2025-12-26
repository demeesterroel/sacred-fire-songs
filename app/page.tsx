import Header from "@/components/common/Header";
import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";

export default function Home() {
  const mockSongs = [
    { title: "Grandmother Earth", author: "Traditional", songKey: "Am", color: "red" },
    { title: "Aguita de la Vida", author: "Danit", songKey: "Em", color: "orange" },
    { title: "Pachamama", author: "Medicine Family", songKey: "G", color: "yellow" },
    { title: "Water Spirit", author: "Nalini Blossom", songKey: "Dm", color: "blue" },
    { title: "Cuatro Vientos", author: "Danit", songKey: "Am", color: "purple" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center">
      {/* Phone Frame */}
      <div className="w-full max-w-[400px] bg-gray-900 min-h-screen border-x border-gray-800 relative shadow-2xl flex flex-col">
        <Header />

        <SearchBar />

        <main className="flex-1 p-4 space-y-3 pb-24 overflow-y-auto hide-scroll">
          {mockSongs.map((song, index) => (
            <SongCard
              key={index}
              title={song.title}
              author={song.author}
              songKey={song.songKey}
              accentColor={song.color}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
