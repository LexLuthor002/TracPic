import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  username: text("username"),
  avatarUrl: text("avatar_url"),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  floorPrice: numeric("floor_price").notNull(),
  volume: numeric("volume").notNull(),
});

export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").references(() => collections.id),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  price: numeric("price").notNull(),
  rarity: text("rarity").notNull(), // Common, Uncommon, Rare, Legendary
  ownerId: integer("owner_id").references(() => users.id),
  likes: integer("likes").default(0),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id).notNull(),
  receiverId: integer("receiver_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trades = pgTable("trades", {
  id: serial("id").primaryKey(),
  nftId: integer("nft_id").references(() => nfts.id).notNull(),
  buyerId: integer("buyer_id").references(() => users.id).notNull(),
  sellerId: integer("seller_id").references(() => users.id).notNull(),
  price: numeric("price").notNull(),
  status: text("status").notNull(), // pending, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  nfts: many(nfts),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
}));

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCollectionSchema = createInsertSchema(collections).omit({ id: true });
export const insertNftSchema = createInsertSchema(nfts).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertTradeSchema = createInsertSchema(trades).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type Collection = typeof collections.$inferSelect;
export type Nft = typeof nfts.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Trade = typeof trades.$inferSelect;
