import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { MOCK_NFTS } from "../lib/mock-data";

export function useNfts() {
  return useQuery({
    queryKey: [api.nfts.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.nfts.list.path);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        return api.nfts.list.responses[200].parse(data);
      } catch (error) {
        console.warn("Falling back to mock NFTs", error);
        return MOCK_NFTS;
      }
    },
  });
}

export function useNft(id: number) {
  return useQuery({
    queryKey: [api.nfts.get.path, id],
    queryFn: async () => {
      try {
        const url = buildUrl(api.nfts.get.path, { id });
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        return api.nfts.get.responses[200].parse(data);
      } catch (error) {
        console.warn("Falling back to mock NFT", error);
        return MOCK_NFTS.find(n => n.id === id) || null;
      }
    },
    enabled: !!id,
  });
}
