import Link from "next/link";
import React from "react";

function Content({ content, mentions }) {
  return content.split(/([@\w\.]+)/).map((element) => {
    if (
      element.startsWith("@") &&
      mentions &&
      mentions.length &&
      mentions.includes(element.slice(1))
    ) {
      return (
        <span className="text-gray-500 text-xs">
          <Link href={`/${element.slice(1)}`}>
            <a> @{element.slice(1)} </a>
          </Link>
        </span>
      );
    }
    return element;
  });
}

export default Content;
