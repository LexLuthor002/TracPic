import { Link } from "wouter";
import { Heart, Activity } from "lucide-react";
import { Nft } from "@shared/schema";
import { Badge } from "./ui/Badge";
import { motion } from "framer-motion";

interface NftCardProps {
  nft: Nft;
  index: number;
}

export function NftCard({ nft, index }: NftCardProps) {
  const getRarityVariant = (rarity: string) => {
    const r = rarity.toLowerCase();
    if (r === 'common') return 'common';
    if (r === 'uncommon') return 'uncommon';
    if (r === 'rare') return 'rare';
    if (r === 'legendary') return 'legendary';
    return 'default';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/nft/${nft.id}`} className="block group">
        <div className="bg-card rounded-2xl p-3 border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/10 overflow-hidden relative">
          
          {/* Image Container */}
          <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-zinc-900">
            <img 
              src={nft.imageUrl} 
              alt={nft.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Top Right Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button 
                onClick={(e) => { e.preventDefault(); /* Like logic */ }}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white hover:text-primary hover:bg-black/50 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Rarity Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge variant={getRarityVariant(nft.rarity)}>
                {nft.rarity}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="px-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-display font-semibold text-lg truncate pr-2 text-foreground group-hover:text-primary transition-colors">
                {nft.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-md">
                <Activity className="w-3 h-3 text-primary" />
                TRAC
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground truncate mb-4">
              {nft.description || "Verified on-chain asset."}
            </p>

            <div className="flex items-end justify-between border-t border-white/5 pt-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
                <p className="font-mono font-bold text-white flex items-center gap-1.5">
                  <span className="text-primary font-sans">Ξ</span> {nft.price}
                </p>
              </div>
              <button className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-primary text-sm font-medium transition-colors text-white">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
