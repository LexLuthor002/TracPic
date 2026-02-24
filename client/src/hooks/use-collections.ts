import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { MOCK_COLLECTIONS } from "../lib/mock-data";

export function useCollections() {
  return useQuery({
    queryKey: [api.collections.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.collections.list.path);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        return api.collections.list.responses[200].parse(data);
      } catch (error) {
        console.warn("Falling back to mock Collections", error);
        return MOCK_COLLECTIONS;
      }
    },
  });
}

export function useCollection(id: number) {
  return useQuery({
    queryKey: [api.collections.get.path, id],
    queryFn: async () => {
      try {
        const url = buildUrl(api.collections.get.path, { id });
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        return api.collections.get.responses[200].parse(data);
      } catch (error) {
        console.warn("Falling back to mock Collection", error);
        return MOCK_COLLECTIONS.find(c => c.id === id) || null;
      }
    },
    enabled: !!id,
  });
}
