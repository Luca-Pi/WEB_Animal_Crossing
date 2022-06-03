import { defineStore } from "pinia";
import http from "@/plugins/axios";

import { useUserStore } from "@/stores/user";

export interface Insect {
  id?: number;
  name?: string;
  image_url?: string;
  catchphrase?: string;
  location?: string;
  sell_nook?: number;
  hasInsect?: boolean;
}

export const useInsectsStore = defineStore("insectsStore", () => {
  const { getToken, getUserId } = useUserStore();

  function getInsects(): Promise<Insect[]> {
    return new Promise(async (resolve, reject) => {
      const insects = (await http.get(`/api/insects?api_token=${getToken}`))
        .data;

      return resolve(insects);
    });
  }

  function getInsect(id: number): Promise<Insect> {
    return new Promise(async (resolve, reject) => {
      const insect = (
        await http.get(`/api/insects/${id}?api_token=${getToken}`)
      ).data;

      return resolve(insect);
    });
  }

  function getInsectsUser(): Promise<Insect[]> {
    return new Promise(async (resolve, reject) => {
      const insects = (
        await http.get(
          `/api/user-insects?api_token=${getToken}&user_id=${getUserId}`
        )
      ).data;

      return resolve(insects);
    });
  }

  function addInsectInCollection(idInsect: number): Promise<Insect> {
    return new Promise(async (resolve, reject) => {
      const insect = (
        await http.post(
          `/api/has-insect-user?api_token=${getToken}&user_id=${getUserId}&insect_id=${idInsect}`
        )
      ).data;

      return resolve(insect);
    });
  }

  function removeInsectFromCollection(idInsect: number): Promise<Insect> {
    return new Promise(async (resolve, reject) => {
      const insect = (
        await http.delete(
          `/api/has-insects-user-remove?api_token=${getToken}&user_id=${getUserId}&insect_id=${idInsect}`
        )
      ).data;

      return resolve(insect);
    });
  }

  function getInsectsFiltered(params: string): Promise<Insect[]> {
    return new Promise(async (resolve, reject) => {
      const insects = (
          await http.get(`/api/insects/search?api_token=${getToken}${params}`)
      ).data;

      return resolve(insects);
    });
  }

  return {
    getInsects,
    getInsect,
    getInsectsUser,
    addInsectInCollection,
    removeInsectFromCollection,
    getInsectsFiltered,
  };
});
