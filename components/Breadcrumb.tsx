import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Breadcrumb = () => {
  const router = useRouter();
  let joinedPath = "";
  return (
    <>
      {/* pathを取得,/で分割 */}
      {router.asPath.split("/").map((path, index) => {
        if (path) {
          joinedPath += path + "/";
          return (
            <Link key={index} href={`/${joinedPath}`}>
              <a className="text-gray-500 hover:text-gray-600">
                <span className="text-gray-500 mx-2">/</span> {path}
              </a>
            </Link>
          );
        }
      })}
    </>
  );
};
