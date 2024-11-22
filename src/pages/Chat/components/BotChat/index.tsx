import React from 'react';
import MarkdownLoader from "@/components/MarkdownComponent";

interface Props {
  message: string;
}

/**
 * 存放模型回复消息的消息框
 * @param props
 * @constructor
 */
const BotChatCard: React.FC<Props> = (props) => {
  const { message } = props;

  return (
    <>
      <div className="message-row bubble user-row svelte-gutj6d">
        <div
          className="message user svelte-gutj6d message-bubble-border"
          style={{textAlign: 'left'}}
        >
          <MarkdownLoader message={message}/>
        </div>
      </div>
    </>
  );
};
export default BotChatCard;
