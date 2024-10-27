import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { MessageBubble } from './MessageBubble';
import { Message } from '../../types';
import AutoSizer from 'react-virtualized-auto-sizer';

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUserId }) => {
  const listRef = React.useRef<List>(null);
  
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, 'end');
    }
  }, [messages.length]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const message = messages[index];
    return (
      <div style={style} className="px-4 py-2">
        <MessageBubble
          message={message}
          isUser={message.senderId === currentUserId}
        />
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#1e1e1e]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={messages.length}
            itemSize={80} // 使用固定高度
            className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
