import { z } from 'zod';
import { insertUserSchema, insertCollectionSchema, insertNftSchema, insertMessageSchema, insertTradeSchema, users, collections, nfts, messages, trades } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  users: {
    me: {
      method: 'GET' as const,
      path: '/api/users/me' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.notFound,
      }
    }
  },
  collections: {
    list: {
      method: 'GET' as const,
      path: '/api/collections' as const,
      responses: { 200: z.array(z.custom<typeof collections.$inferSelect>()) }
    },
    get: {
      method: 'GET' as const,
      path: '/api/collections/:id' as const,
      responses: { 200: z.custom<typeof collections.$inferSelect>(), 404: errorSchemas.notFound }
    }
  },
  nfts: {
    list: {
      method: 'GET' as const,
      path: '/api/nfts' as const,
      responses: { 200: z.array(z.custom<typeof nfts.$inferSelect>()) }
    },
    get: {
      method: 'GET' as const,
      path: '/api/nfts/:id' as const,
      responses: { 200: z.custom<typeof nfts.$inferSelect>(), 404: errorSchemas.notFound }
    }
  },
  messages: {
    list: {
      method: 'GET' as const,
      path: '/api/messages/:userId' as const,
      responses: { 200: z.array(z.custom<typeof messages.$inferSelect>()) }
    },
    send: {
      method: 'POST' as const,
      path: '/api/messages' as const,
      input: insertMessageSchema,
      responses: { 201: z.custom<typeof messages.$inferSelect>() }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
