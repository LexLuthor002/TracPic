import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.users.me.path, async (req, res) => {
    // Mock user for now since no auth is hooked up
    const user = await storage.getUser(1);
    if (!user) {
      return res.status(401).json({ message: "Not logged in" });
    }
    res.json(user);
  });

  app.get(api.collections.list.path, async (req, res) => {
    const allCollections = await storage.getCollections();
    res.json(allCollections);
  });

  app.get(api.collections.get.path, async (req, res) => {
    const collection = await storage.getCollection(Number(req.params.id));
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  });

  app.get(api.nfts.list.path, async (req, res) => {
    const allNfts = await storage.getNfts();
    res.json(allNfts);
  });

  app.get(api.nfts.get.path, async (req, res) => {
    const nft = await storage.getNft(Number(req.params.id));
    if (!nft) {
      return res.status(404).json({ message: "NFT not found" });
    }
    res.json(nft);
  });

  app.get('/api/messages/:userId', async (req, res) => {
    const userMsgs = await storage.getMessages(Number(req.params.userId));
    res.json(userMsgs);
  });

  app.post(api.messages.send.path, async (req, res) => {
    try {
      const input = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed the DB internally
  seedDatabase().catch(console.error);

  return httpServer;
}

import { db } from "./db";
import { users, collections, nfts } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedDatabase() {
  const existingUsers = await storage.getUser(1);
  if (!existingUsers) {
    const [user1] = await db.insert(users).values({
      walletAddress: "0x1234567890abcdef",
      username: "CryptoPlayer1",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoPlayer1"
    }).returning();
    
    const [user2] = await db.insert(users).values({
      walletAddress: "0x0987654321fedcba",
      username: "NFT_Trader",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=NFT_Trader"
    }).returning();

    const [col1] = await db.insert(collections).values({
      name: "CryptoVoids",
      slug: "crypto-voids",
      description: "A legendary collection of crypto voids.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      floorPrice: "5.1",
      volume: "920",
    }).returning();

    const [col2] = await db.insert(collections).values({
      name: "Digital Realms",
      slug: "digital-realms",
      description: "Explore the digital realms.",
      imageUrl: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce",
      floorPrice: "1.62",
      volume: "506",
    }).returning();

    await db.insert(nfts).values([
      {
        collectionId: col1.id,
        name: "Crimson Nexus #42",
        description: "The core of the crimson nexus.",
        imageUrl: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c",
        price: "4.325",
        rarity: "Rare",
        ownerId: user1.id,
        likes: 348
      },
      {
        collectionId: col2.id,
        name: "Digital Phantom #18",
        description: "A phantom in the digital realm.",
        imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
        price: "2.73",
        rarity: "Common",
        ownerId: user2.id,
        likes: 38
      },
      {
        collectionId: col1.id,
        name: "Void Walker #33",
        description: "Walk the void.",
        imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
        price: "3.072",
        rarity: "Rare",
        ownerId: user1.id,
        likes: 9
      },
      {
        collectionId: col2.id,
        name: "Pulse Fragment #91",
        description: "A fragment of the original pulse.",
        imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
        price: "8.143",
        rarity: "Legendary",
        ownerId: user2.id,
        likes: 496
      }
    ]);
  }
}