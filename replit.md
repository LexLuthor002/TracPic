# TRAC + Intercom On-Chain Gaming Platform

A modular on-chain gaming NFT marketplace platform built on TRAC network with Intercom P2P communication layer. This is designed as a plug-and-play middleware SDK that game developers can integrate into existing games.

## Tech Stack

### Frontend
- React + TypeScript + Vite
- TanStack Query for data fetching
- Wouter for routing
- Framer Motion for animations
- Tailwind CSS with dark theme (crimson/red accents)
- Shadcn UI components

### Backend
- Express.js
- PostgreSQL (Drizzle ORM)
- Zod for validation
- REST API architecture

## Architecture

### Core Components

1. **TRAC Data Layer** (`shared/schema.ts`)
   - NFT metadata storage (ERC-721 standard abstraction)
   - Asset ownership records
   - Transaction logs and trade history
   - Collections and rarity tiers

2. **Smart Contract Layer** (Backend API)
   - NFT listing and viewing
   - Collection management
   - Future: Marketplace contracts, staking, tournaments

3. **Intercom P2P Layer** (`messages` table)
   - Real-time messaging between players
   - Trade negotiation
   - Guild coordination channels

4. **Developer SDK** (API Contract)
   - REST endpoints defined in `shared/routes.ts`
   - TypeScript client library
   - Asset querying utilities

## Database Schema

- **users**: Wallet addresses, usernames, avatars
- **collections**: NFT collections with floor prices and volume
- **nfts**: Individual NFT items with rarity, price, ownership
- **messages**: P2P communication between users
- **trades**: Transaction history (future implementation)

## API Endpoints

- `GET /api/collections` - List all collections
- `GET /api/collections/:id` - Get collection details
- `GET /api/nfts` - List all NFTs
- `GET /api/nfts/:id` - Get NFT details
- `GET /api/messages/:userId` - Get user messages
- `POST /api/messages` - Send a message

## Features

### Implemented
- NFT marketplace browsing
- Collection statistics (floor price, volume)
- Rarity system (Common, Uncommon, Rare, Legendary)
- P2P messaging interface
- Dark theme with crimson accents
- Responsive design

### Future Enhancements
- Wallet connection
- NFT minting engine
- Marketplace trading (buy/sell/auction)
- Staking & reward distribution
- Tournament reward escrow
- Cross-game NFT interoperability
- Real-time WebSocket communication
- DAO governance panel

## Design

The UI follows the TracPic design system with:
- Dark mode (very dark grey/black backgrounds)
- Crimson/red primary accents
- Glass morphism effects
- Card-based layouts
- Premium gaming aesthetic

## Running the Project

```bash
npm run dev
```

The application runs on port 5000 with both backend API and frontend served together.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (auto-provisioned by Replit)
- `SESSION_SECRET`: Session encryption key
