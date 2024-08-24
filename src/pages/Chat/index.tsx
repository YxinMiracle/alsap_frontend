import '@umijs/max';
import React from 'react';
import Markdown from 'react-markdown';

const Chat: React.FC = () => {
  const markdown = "# A demo of `react-markdown`\n" +
    "\n" +
    "`react-markdown` is a markdown component for React.\n" +
    "\n" +
    "👉 Changes are re-rendered as you type.\n" +
    "\n" +
    "👈 Try writing some markdown on the left.\n" +
    "\n" +
    "## Overview\n" +
    "\n" +
    "* Follows [CommonMark](https://commonmark.org)\n" +
    "* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)\n" +
    "* Renders actual React elements instead of using `dangerouslySetInnerHTML`\n" +
    "* Lets you define your own components (to render `MyHeading` instead of `'h1'`)\n" +
    "* Has a lot of plugins\n" +
    "\n" +
    "## Contents\n" +
    "\n" +
    "Here is an example of a plugin in action\n" +
    "([`remark-toc`](https://github.com/remarkjs/remark-toc)).\n" +
    "**This section is replaced by an actual table of contents**.\n" +
    "\n" +
    "## Syntax highlighting\n" +
    "\n" +
    "Here is an example of a plugin to highlight code:\n" +
    "[`rehype-highlight`](https://github.com/rehypejs/rehype-highlight).\n" +
    "\n" +
    "```js\n" +
    "import React from 'react'\n" +
    "import ReactDOM from 'react-dom'\n" +
    "import Markdown from 'react-markdown'\n" +
    "import rehypeHighlight from 'rehype-highlight'";

  return (
    <>
      <Markdown>{markdown}</Markdown>
    </>
  );
};
export default Chat;
