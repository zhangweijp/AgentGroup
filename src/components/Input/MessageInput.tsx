import React, { useState, useRef, useEffect } from 'react';
import { Agent } from '../../types';

interface MessageInputProps {
  onSendMessage: (content: string, mentions: string[]) => void;
  agents: Agent[];
  selectedAgent: Agent | null;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  agents,
  selectedAgent
}) => {
  const [message, setMessage] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        const mentions = message.match(/@(\w+)/g)?.map(m => m.slice(1)) || [];
        onSendMessage(message, mentions);
        setMessage('');
      }
    } else if (e.key === '@') {
      setShowMentions(true);
      setMentionSearch('');
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedAgent ? `发送给 ${selectedAgent.name}...` : "输入消息..."}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
          rows={3}
        />
        
        {showMentions && (
          <div className="absolute bottom-full left-4 w-64 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
            {filteredAgents.map(agent => (
              <button
                key={agent.id}
                className="w-full p-2 text-left hover:bg-gray-50 flex items-center gap-2"
                onClick={() => {
                  setMessage(prev => prev + agent.name + ' ');
                  setShowMentions(false);
                  inputRef.current?.focus();
                }}
              >
                <img src={agent.avatar} alt={agent.name} className="w-6 h-6 rounded-full" />
                <div>
                  <div className="font-medium text-sm text-gray-700">{agent.name}</div>
                  <div className="text-xs text-gray-400">{agent.role}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
