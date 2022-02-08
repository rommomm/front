import Link from "next/link";
import React from "react";

function MentionContent({ content, mentions }) {
  if (!mentions) {
    return content;
  }
  return content.split(/([@\w\.]+)/).map((element) => {
    if (element.startsWith("@") && mentions.includes(element.slice(1))) {
      return (
        <span className="btn text-info p-0 text-gray-500">
          <Link href={`/${element.slice(1)}`}>
            <a>@{element.slice(1)}</a>
          </Link>
        </span>
      );
    }
    return element;
  });
}

export default MentionContent;
