import { ReactNode } from "react";
import { ParsedUrlQuery } from "querystring";

export type LayoutProps = {
  children: ReactNode;
};

export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  tags: string[];
  content: string;
};

export type CardProps = {
  page: PageProps;
};

export type ArticleProps = CardProps;
export type ArticleMetaProps = CardProps;

export type Params = ParsedUrlQuery & {
  slug: string;
};
