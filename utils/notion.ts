import { Client } from "@notionhq/client";

//インスタンス化
const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

//DBからデータ取得
export const fetchPages = async () => {
  return await notion.databases.query({
    database_id: DATABASE_ID,
  });
};