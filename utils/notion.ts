import { Client } from "@notionhq/client";

//インスタンス化
const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

//DBからデータ取得
// ?slug,?tagがあればstringを返す(フィルター)
export const fetchPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  //slugがあればand配列に追加
  if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug, //テキスト内容が正しいかチェック
      },
    });
  }
  //tagがあればand配列に追加
  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag, //multi_selectは配列のためcontains
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_ID,
    //除外
    filter: {
      and: and,
    },
    //ソート
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  });
};

//ページIDからBlock一覧を取得
export const fetchBlocksByPageId = async (pageId: string) => {
  return await notion.blocks.children.list({ block_id: pageId });
};
