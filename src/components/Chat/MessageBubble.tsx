import React from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  return (
    <div
      className={`flex w-full mt-2 space-x-3 max-w-2xl ${
        isUser ? 'ml-auto justify-end' : ''
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8">
          <img
            className="w-full h-full rounded-full"
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${message.senderId}`}
            alt="Avatar"
          />
        </div>
      )}
      
      <div>
        <div
          className={`relative p-3 rounded-lg ${
            isUser
              ? 'bg-chat-bubble-user text-gray-800'
              : 'bg-chat-bubble-ai text-gray-800 shadow-sm'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-gray-400 leading-none mt-1 inline-block">
          {format(message.timestamp, 'HH:mm', { locale: zhCN })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8">
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-sm">
            我
          </div>
        </div>
      )}
    </div>
  );
};
