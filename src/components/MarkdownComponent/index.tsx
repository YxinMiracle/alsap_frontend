//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//@ts-ignore
import Markdown from 'react-markdown';
//@ts-ignore
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  message: string;
}

const MarkdownLoader: React.FC<Props> = (props: Props) => {
  const { message } = props;

  return (
    <Markdown
      components={{
        code(props) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter {...rest} PreTag="div" language={match[1]} style={coldarkDark}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {message}
    </Markdown>
  );
};

export default MarkdownLoader;
