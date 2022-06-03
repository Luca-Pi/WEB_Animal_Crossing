import { defineStore } from "pinia";
import http from "@/plugins/axios";

import { useUserStore } from "@/stores/user";

export interface SeaCreature {
  id?: number;
  name?: string;
  image_url?: string;
  period?: string;
  hours?: string;
  place?: string;
  movement?: string;
  price?: number;
}

export const useSeaCreaturesStore = defineStore("seaCreaturesStore", () => {
  const { getToken, getUserId } = useUserStore();

  function getSeaCreatures(): Promise<SeaCreature[]> {
    return new Promise(async (resolve, reject) => {
      const seaCreatures = (
        await http.get(`/api/sea_creatures?api_token=${getToken}`)
      ).data;

      return resolve(seaCreatures);
    });
  }

  function getSeaCreature(id: number): Promise<SeaCreature> {
    return new Promise(async (resolve, reject) => {
      const seaCreature = (
        await http.get(`/api/sea_creatures/${id}?api_token=${getToken}`)
      ).data;

      return resolve(seaCreature);
    });
  }

  function getSeaCreaturesUser(): Promise<SeaCreature[]> {
    return new Promise(async (resolve, reject) => {
      const seaCreatures = (
        await http.get(
          `/api/user-sea-creatures?api_token=${getToken}&user_id=${getUserId}`
        )
      ).data;

      return resolve(seaCreatures);
    });
  }

  function addSeaCreatureInCollection(idSeaCreature: number): Promise<SeaCreature> {
    return new Promise(async (resolve, reject) => {
      const seaCreature = (
        await http.post(
          `/api/has-sea-creature-user?api_token=${getToken}&user_id=${getUserId}&sea_creature_id=${idSeaCreature}`
        )
      ).data;

      return resolve(seaCreature);
    });
  }

  function removeSeaCreatureFromCollection(idSeaCreature: number): Promise<SeaCreature> {
    return new Promise(async (resolve, reject) => {
      const seaCreature = (
        await http.delete(
          `/api/has-sea-creature-user-remove?api_token=${getToken}&user_id=${getUserId}&sea_creature_id=${idSeaCreature}`
        )
      ).data;

      return resolve(seaCreature);
    });
  }

  function getSeaCreaturesFiltered(params: string): Promise<Insect[]> {
    return new Promise(async (resolve, reject) => {
      const seaCreatures = (
          await http.get(`/api/sea-creatures/search?api_token=${getToken}${params}`)
      ).data;

      return resolve(seaCreatures);
    });
  }

  return { getSeaCreatures, getSeaCreature, getSeaCreaturesUser, addSeaCreatureInCollection, removeSeaCreatureFromCollection, getSeaCreaturesFiltered };
});
