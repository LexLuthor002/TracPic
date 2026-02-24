import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { MOCK_MESSAGES, MOCK_USER } from "../lib/mock-data";
import { z } from "zod";

// Shared mutable state for mock interactions
let localMockMessages = [...MOCK_MESSAGES];

export function useMessages(userId: number) {
  return useQuery({
    queryKey: [api.messages.list.path, userId],
    queryFn: async () => {
      try {
        const url = buildUrl(api.messages.list.path, { userId });
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        return api.messages.list.responses[200].parse(data);
      } catch (error) {
        console.warn("Falling back to mock Messages", error);
        return localMockMessages;
      }
    },
    enabled: !!userId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.messages.send.input>) => {
      try {
        const validated = api.messages.send.input.parse(data);
        const res = await fetch(api.messages.send.path, {
          method: api.messages.send.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validated),
        });
        if (!res.ok) throw new Error("Failed to send message");
        return api.messages.send.responses[201].parse(await res.json());
      } catch (error) {
        console.warn("Mocking message send", error);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const newMessage = {
          id: Date.now(),
          ...data,
          createdAt: new Date(),
        };
        localMockMessages.push(newMessage as any);
        return newMessage;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path, variables.senderId] });
    },
  });
}
