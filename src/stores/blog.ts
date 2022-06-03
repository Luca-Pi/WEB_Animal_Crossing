import { defineStore } from "pinia";
import http from "@/plugins/axios";

import { useUserStore } from "@/stores/user";

export interface Article {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  excerpt?: string;
  created_at?: Date;
}

export const useBlogStore = defineStore("BlogStore", () => {
  const { getToken } = useUserStore();

  function getArticles(): Promise<Article[]> {
    return new Promise(async (resolve, reject) => {
      const articles = (
        await http.get(`/api/publications?api_token=${getToken}`)
      ).data;

      return resolve(articles);
    });
  }

  function getArticle(id:String): Promise<Article[]> {
    return new Promise(async (resolve, reject) => {
      const article = (
        await http.get(`/api/publications/${id}?api_token=${getToken}`)
      ).data;

      return resolve(article);
    });
  }


  return { getArticles,getArticle };
});
