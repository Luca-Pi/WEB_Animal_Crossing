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
  updated_at?:Date;
}

export interface Category {
  id?: number;
  label?: string;
  icon?: string;
  created_at?: Date;
  updated_at?:Date;
}

interface ArticleForm {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
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

  function getCategory(): Promise<Article[]> {
    return new Promise(async (resolve, reject) => {
      const category = (
        await http.get(`/api/category?api_token=${getToken}`)
      ).data;

      return resolve(category);
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

  

  async function postArticle(data:ArticleForm) {
      try{
        await http.post(`/api/publications/?api_token=${getToken}`,data)
        return true
      }catch(e){
        return false
      }
  }


  return { getArticles,getArticle,postArticle,getCategory };
});
