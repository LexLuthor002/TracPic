import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { NftCard } from "../components/NftCard";
import { useNfts } from "../hooks/use-nfts";
import { Filter, Search } from "lucide-react";
import { ChatWidget } from "../components/ChatWidget";

export default function Explore() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeRarity, setActiveRarity] = useState<string | null>(null);
  
  const { data: nfts = [], isLoading } = useNfts();

  const filteredNfts = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(search.toLowerCase());
    const matchesRarity = activeRarity ? nft.rarity.toLowerCase() === activeRarity.toLowerCase() : true;
    return matchesSearch && matchesRarity;
  });

  const rarities = ["Common", "Uncommon", "Rare", "Legendary"];

  return (
    <div className="min-h-screen pb-20">
      <Navbar onOpenChat={() => setIsChatOpen(!isChatOpen)} />
      
      <main className="pt-28 lg:pt-36 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Explore Marketplace</h1>
            <p className="text-muted-foreground">Find the best gaming assets on the TRAC network.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items..." 
                className="w-full bg-card border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            {/* Filter Dropdown Mock */}
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-card border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Categories / Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button 
            onClick={() => setActiveRarity(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!activeRarity ? 'bg-white text-black' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
          >
            All
          </button>
          {rarities.map(r => (
            <button 
              key={r}
              onClick={() => setActiveRarity(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeRarity === r ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* NFT Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : filteredNfts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNfts.map((nft, i) => (
              <NftCard key={nft.id} nft={nft} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-white/5 rounded-2xl bg-card/30">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            <button 
              onClick={() => { setSearch(""); setActiveRarity(null); }}
              className="mt-6 text-primary hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
