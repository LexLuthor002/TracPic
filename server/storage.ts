import { db } from "./db";
import {
  users, collections, nfts, messages, trades,
  type User, type Collection, type Nft, type Message, type Trade,
  type InsertUser, type InsertMessage
} from "@shared/schema";
import { eq, or } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  
  // Collections
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
  
  // NFTs
  getNfts(): Promise<Nft[]>;
  getNft(id: number): Promise<Nft | undefined>;
  
  // Messages (Intercom P2P mock)
  getMessages(userId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getCollections(): Promise<Collection[]> {
    return await db.select().from(collections);
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.id, id));
    return collection;
  }

  async getNfts(): Promise<Nft[]> {
    return await db.select().from(nfts);
  }

  async getNft(id: number): Promise<Nft | undefined> {
    const [nft] = await db.select().from(nfts).where(eq(nfts.id, id));
    return nft;
  }

  async getMessages(userId: number): Promise<Message[]> {
    return await db.select().from(messages).where(
      or(eq(messages.senderId, userId), eq(messages.receiverId, userId))
    );
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();