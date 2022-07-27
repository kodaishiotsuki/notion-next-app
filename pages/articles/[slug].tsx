import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React from "react";
import ArticleMeta from "../../components/ArticleMeta";
import Layout from "../../components/Layout";
import { ArticleProps, Params } from "../../types/types";
import { sampleCards } from "../../utils/sample";

//データ取得
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as Params; //それぞれのpathを取得 {slug}は[slug].tsxと合わせる
  const page = sampleCards.find((data) => data.slug === slug);
  return {
    props: {
      page: page,
    },
  };
};

const Article: NextPage<ArticleProps> = ({ page }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12">article {page.content} </div>
      </article>
    </Layout>
  );
};

export default Article;
