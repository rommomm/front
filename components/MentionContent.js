import React from "react";
import Mention from "./Mention";

function MentionContent({ content, mentions }) {
  console.log("content", content);
  console.log("mentions", mentions);
  return content.split(/([@\w\.]+)/).map((part, id) => {
    if (part.startsWith("@") && mentions.includes(part.slice(1))) {
      return <Mention username={part.slice(1)} key={content + id} />;
    }

    return part;
  });
}

export default MentionContent;
