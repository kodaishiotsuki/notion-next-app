/** 汎用関数  **/

import { PageType, RichTextType } from "./../types/types";

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);
    return textArr.join(""); //配列を文字列に返す
  } catch (err) {
    console.error(err);
  }
  return ""; //最終的に文字列を返す
};

export const getCover = (cover: PageType["cover"]) => {
  //coverの値があるかチェック
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  //無ければサンプル画像
  return "/noimage.png";
};

export const getDate = (date: { start: string }) => {
  try {
    return date.start;
  } catch (err) {
    console.error(err);
  }
  return "-";
};

export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  // console.log(multiSelect);
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    console.error(err);
  }
  return [];
};
