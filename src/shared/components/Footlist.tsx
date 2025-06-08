import React, { FC } from "react";
import { TFootlink } from "../types/Tfootlink";
import Link from "next/link";

interface FootlistProps {
  item: TFootlink;
}

const FootList: FC<FootlistProps> = ({ item }) => {
  return <Link href={item.href}>{item.title}</Link>;
};

export default FootList;
