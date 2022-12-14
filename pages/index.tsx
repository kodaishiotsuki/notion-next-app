import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { siteConfig } from "../site.config";
import { IndexProps } from "../types/types";
import { fetchPages } from "../utils/notion";
import { sampleCards } from "../utils/sample";



export const getStaticProps: GetStaticProps = async () => {
  //オブジェクトでNotionデータ取得
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
    },
    //ISR(リアルタイム情報時に使う)
    revalidate: 10, //秒数
  };
};

const Home: NextPage<IndexProps> = ({ pages }) => {
  // console.log(pages);
  return (
    <div>
      <Layout>
        <div className="pt-12">
          <h1 className="text-5xl mb-8">{siteConfig.title}</h1>
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

export default Home;
