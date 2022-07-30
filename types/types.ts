import { ReactNode } from "react";
import { ParsedUrlQuery } from "querystring";
import { BlockType } from "notion-block-renderer";

/** props **/

//Layoutの型
export type LayoutProps = {
  children: ReactNode;
};

//データの型(サンプル)
export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  tags: string[];
  content: string;
};

export type CardProps = { page: PageType };
export type ArticleProps = {
  page: PageType;
  blocks: BlockType[];
};

export type ArticleMetaProps = CardProps;

export type IndexProps = {
  pages: PageType[];
};

export type BlockProps = { block: BlockType };

/** Path **/

//path取得の型
export type Params = ParsedUrlQuery & {
  slug: string;
};

/** DataType **/

//Fileの型（cover→externalのタイプがfileかexternalか不明だから）
// export type FileType = Record<"file" | "external", { url: string }>;
export type FileType = {
  file?: { url: string };
  external?: { url: string };
};

//annotations of Rich text object
export type AnnotationType = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

//Rich text object
export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type Properties = {
  name: { title: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  author: { rich_text: RichTextType[] };
  published: { date: { start: string } };
  isPublic: { checkbox: boolean };
  tags: { multi_select: [{ name: string }] }; //オブジェクト内が配列
};

//APIから必要なデータの型
export type PageType = {
  id: string;
  cover: FileType | null;
  // properties: Record<string, any>;
  properties: Properties;
};

// export type BlockType = {
//   type: string;
//   heading_1: { rich_text: RichTextType[] };
//   heading_2: { rich_text: RichTextType[] };
//   paragraph: { rich_text: RichTextType[] };
// };
