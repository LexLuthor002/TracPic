import { Nft, Collection, Message, User } from "@shared/schema";

export const MOCK_USER: User = {
  id: 1,
  walletAddress: "0x1234...abcd",
  username: "TRAC_Gamer",
  avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
};

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 1,
    name: "Crimson Vanguard",
    slug: "crimson-vanguard",
    description: "Elite tier weapons for the TRAC multiverse.",
    imageUrl: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=400&h=400&fit=crop",
    floorPrice: "0.45",
    volume: "12500"
  },
  {
    id: 2,
    name: "Neon Drifters",
    slug: "neon-drifters",
    description: "Cyberpunk aesthetic vehicles and gear.",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=400&fit=crop",
    floorPrice: "1.2",
    volume: "45200"
  },
  {
    id: 3,
    name: "Void Walkers",
    slug: "void-walkers",
    description: "Mysterious artifacts from the dark edges of space.",
    imageUrl: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=400&h=400&fit=crop",
    floorPrice: "0.85",
    volume: "8900"
  }
];

export const MOCK_NFTS: Nft[] = [
  {
    id: 1,
    collectionId: 1,
    name: "Crimson Nexus #42",
    description: "A highly volatile energy core.",
    imageUrl: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=600&h=600&fit=crop",
    price: "2.5",
    rarity: "Legendary",
    ownerId: 1,
    likes: 342
  },
  {
    id: 2,
    collectionId: 2,
    name: "Neon Drift #7",
    description: "Street-ready hoverboard with custom neon trim.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop",
    price: "0.8",
    rarity: "Rare",
    ownerId: 2,
    likes: 124
  },
  {
    id: 3,
    collectionId: 3,
    name: "Void Walker #33",
    description: "A fragmented piece of the ancient void.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
    price: "0.15",
    rarity: "Common",
    ownerId: 3,
    likes: 45
  },
  {
    id: 4,
    collectionId: 1,
    name: "Crimson Blade #12",
    description: "Standard issue tactical blade.",
    imageUrl: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?w=600&h=600&fit=crop",
    price: "0.3",
    rarity: "Uncommon",
    ownerId: 1,
    likes: 89
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    senderId: 2,
    receiverId: 1,
    content: "Hey, interested in trading that Crimson Nexus?",
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    senderId: 1,
    receiverId: 2,
    content: "Depends on the offer. Looking for at least 2.5 ETH.",
    createdAt: new Date(Date.now() - 3500000)
  },
  {
    id: 3,
    senderId: 2,
    receiverId: 1,
    content: "Would you take 2 ETH + Neon Drift #7?",
    createdAt: new Date(Date.now() - 3400000)
  }
];
