import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { siteConfig } from "../../site.config";
import { IndexProps, Params, TagProps } from "../../types/types";
import { fetchPages } from "../../utils/notion";
import { getMultiSelect } from "../../utils/property";
import { sampleCards } from "../../utils/sample";

//ダイナミックルート + GetStaticProps時に定義
export const getStaticPaths: GetStaticPaths = async () => {
  const { results }: { results: Record<string, any>[] } = await fetchPages({});

  //pathの重複防止
  const pathSet: Set<string> = new Set();

  //tags取得
  for (const page of results) {
    for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
      pathSet.add(tag); //tagを追加
    }
  }

  //tagを配列に変換しmap
  const paths = Array.from(pathSet).map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { tag } = ctx.params as Params; //types.ts
  //オブジェクトでNotionデータ取得
  const { results } = await fetchPages({ tag: tag });
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
    },
    //ISR(リアルタイム情報時に使う)
    revalidate: 10, //秒数
  };
};

const Tag: NextPage<TagProps> = ({ pages, tag }) => {
  // console.log(pages);
  return (
    <div>
      <Layout>
        <div className="pt-12">
          <h1 className="text-5xl mb-8">{`#${tag}`}</h1>
          <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
            {/* Card */}
            {pages.map((page, index) => (
              <Card key={index} page={page} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Tag;
