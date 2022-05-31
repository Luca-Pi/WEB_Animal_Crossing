import { defineStore } from "pinia";
import http from "@/plugins/axios";

import { useUserStore } from "@/stores/user";

export interface Fish {
  id?: number;
  name?: string;
  image_url?: string;
  place?: string;
  period?: string;
  hours?: string;
  size?: number;
  price?: number;
  hasFish?: boolean;
}

export const useFishesStore = defineStore("fishesStore", () => {
  const { getToken, getUserId } = useUserStore();

  function getFishes(): Promise<Fish[]> {
    return new Promise(async (resolve, reject) => {
      const fishes = (await http.get(`/api/fishes?api_token=${getToken}`)).data;

      return resolve(fishes);
    });
  }

  function getFish(id: number): Promise<Fish> {
    return new Promise(async (resolve, reject) => {
      const fish = (await http.get(`/api/fishes/${id}?api_token=${getToken}`))
        .data;

      return resolve(fish);
    });
  }

  function getFishesUser(): Promise<Fish[]> {
    return new Promise(async (resolve, reject) => {
      const fish = (
        await http.get(
          `/api/user-fishes?api_token=${getToken}&user_id=${getUserId}`
        )
      ).data;

      return resolve(fish);
    });
  }

  function addFishInCollection(idFish: number): Promise<Fish> {
    return new Promise(async (resolve, reject) => {
      const fish = (
        await http.post(
          `/api/has-fish-user?api_token=${getToken}&user_id=${getUserId}&fish_id=${idFish}`
        )
      ).data;

      return resolve(fish);
    });
  }

  function removeFishFromCollection(idFish: number): Promise<Fish> {
    return new Promise(async (resolve, reject) => {
      const fish = (
        await http.delete(
          `/api/has-fish-user-remove?api_token=${getToken}&user_id=${getUserId}&fish_id=${idFish}`
        )
      ).data;

      return resolve(fish);
    });
  }

  function getFishesFiltered(params: string): Promise<Fish[]> {
    return new Promise(async (resolve, reject) => {
      const fishes = (
        await http.get(`/api/fishes/search?api_token=${getToken}${params}`)
      ).data;

      return resolve(fishes);
    });
  }

  return {
    getFishes,
    getFish,
    getFishesUser,
    addFishInCollection,
    removeFishFromCollection,
    getFishesFiltered,
  };
});
