import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Trophy, Shield, Users, Layers, TrendingUp } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { NftCard } from "../components/NftCard";
import { ChatWidget } from "../components/ChatWidget";
import { useNfts } from "../hooks/use-nfts";
import { useCollections } from "../hooks/use-collections";
import { Link } from "wouter";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { data: nfts = [], isLoading: loadingNfts } = useNfts();
  const { data: collections = [], isLoading: loadingCollections } = useCollections();

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <Navbar onOpenChat={() => setIsChatOpen(!isChatOpen)} />
      
      <main className="pt-28 lg:pt-36">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left pt-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                TRAC Network Live
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
                Discover, Collect & <br className="hidden lg:block"/>
                <span className="text-gradient-primary">Trade Verified</span> NFTs
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                The premier on-chain gaming NFT platform. Securely trade, negotiate P2P, and build your digital legacy on the TRAC network.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/explore">
                  <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2">
                    Explore Marketplace <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  View Collections
                </button>
              </div>
            </motion.div>

            {/* Hero Visual / Featured NFT */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
               {/* sci-fi character portrait for hero */}
               <img 
                 src="https://images.unsplash.com/photo-1536243298747-ea8874136d64?w=800&h=800&fit=crop" 
                 alt="Featured Hero NFT"
                 className="rounded-2xl border border-white/10 shadow-2xl w-full max-w-[500px] ml-auto object-cover aspect-[4/5]"
               />
               
               {/* Floating Badges */}
               <div className="absolute top-10 -left-6 glass-panel px-6 py-4 rounded-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Verified Asset</p>
                    <p className="text-xs text-muted-foreground">On-chain Provenance</p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            {[
              { label: "Total Volume", value: "$45.2M", icon: TrendingUp },
              { label: "Floor Price", value: "0.5 ETH", icon: Trophy },
              { label: "Active Users", value: "12.4K", icon: Users },
              { label: "Total NFTs", value: "145K+", icon: Layers },
            ].map((stat, i) => (
              <div key={i} className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">{stat.value}</h3>
              </div>
            ))}
          </motion.div>
        </section>

        {/* TRENDING NFTs */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-32">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold flex items-center gap-3">
              <Flame className="w-8 h-8 text-primary" />
              Trending NFTs
            </h2>
            <Link href="/explore">
              <button className="text-sm font-medium text-primary hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {loadingNfts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nfts.slice(0, 4).map((nft, i) => (
                <NftCard key={nft.id} nft={nft} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* TOP COLLECTIONS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-32">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Top Collections
            </h2>
          </div>

          <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:grid">
              <div className="col-span-5">Collection</div>
              <div className="col-span-3 text-right">Floor Price</div>
              <div className="col-span-4 text-right">Volume</div>
            </div>

            {loadingCollections ? (
              <div className="p-8 text-center text-muted-foreground">Loading collections...</div>
            ) : (
              <div className="divide-y divide-white/5">
                {collections.map((col, i) => (
                  <Link key={col.id} href={`/collection/${col.id}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="col-span-1 sm:col-span-5 flex items-center gap-4">
                        <span className="font-display font-bold text-lg text-muted-foreground w-6 text-center">{i + 1}</span>
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                          <img src={col.imageUrl || ''} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{col.name}</h4>
                          <p className="text-xs text-muted-foreground sm:hidden mt-1">Floor: {col.floorPrice} ETH • Vol: {col.volume}</p>
                        </div>
                      </div>
                      <div className="hidden sm:block col-span-3 text-right font-mono text-white">
                        <span className="text-primary font-sans mr-1">Ξ</span> {col.floorPrice}
                      </div>
                      <div className="hidden sm:block col-span-4 text-right font-mono text-white">
                        <span className="text-primary font-sans mr-1">Ξ</span> {col.volume}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
