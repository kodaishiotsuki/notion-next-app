import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import React from "react";
import ArticleMeta from "../../components/ArticleMeta";
import Layout from "../../components/Layout";
import { ArticleProps, Params } from "../../types/types";
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";
import { getText } from "../../utils/property";

//ダイナミックルート + GetStaticProps時に定義
export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};
//データ取得
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params; //それぞれのpathを取得 {slug}は[slug].tsxと合わせる
  const { results } = await fetchPages({ slug: slug });
  const page = results[0]; //重複防止
  const pageId = page.id;
  // console.log(page);
  //Block一覧取得 (変数名blocks)
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  return {
    props: {
      page: page,
      blocks: blocks,
    },
    revalidate: 10, //ISR設定
  };
};

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  console.log("page", page);
  console.log("blocks", blocks);
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12"> {page.content} </div>
      </article>
    </Layout>
  );
};

export default Article;
