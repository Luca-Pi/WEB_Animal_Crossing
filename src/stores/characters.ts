import { defineStore } from "pinia";
import http from "@/plugins/axios";

import { useUserStore } from "@/stores/user";

export interface Character {
  id?: number;
  name?: string;
  iconImage?: string;
  photoImage?: string;
  description?: string;
  birthday_day?: number;
  birthday_month?: number;
  species?: {
    name?: string;
  };
  gender?:{
    name?:string
  }
}

export const useCharactersStore = defineStore("charactersStore", () => {
  const { getToken } = useUserStore();

  function getCharacters(): Promise<Character[]> {
    return new Promise(async (resolve, reject) => {
      const characters = (
        await http.get(`/api/characters?api_token=${getToken}`)
      ).data;

      return resolve(characters);
    });
  }

  function getCharacter(id: number): Promise<Character> {
    return new Promise(async (resolve, reject) => {
      const character = (
        await http.get(`/api/characters/${id}?api_token=${getToken}`)
      ).data;

      return resolve(character);
    });
  }

  return { getCharacters, getCharacter };
});
