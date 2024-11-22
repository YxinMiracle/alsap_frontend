import React from 'react';

interface Props {
  message: string;
}

/**
 * 存放用户发出消息的消息框
 * @param props
 * @constructor
 */
const UserChatCard: React.FC<Props> = (props) => {
  const { message } = props;

  return (
    <>
      <div className="message-row bubble bot-row svelte-gutj6d">
        <div
          className="message bot svelte-gutj6d message-bubble-border"
          style={{textAlign: 'left'}}
        >
          {message}
        </div>
      </div>
    </>
  );
};
export default UserChatCard;
