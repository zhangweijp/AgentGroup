import React from 'react';
import { Agent, AgentStatus } from '../../types';

interface AgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  onStatusUpdate: (agentId: string, status: AgentStatus) => void;
}

export const AgentList: React.FC<AgentListProps> = ({
  agents,
  onSelectAgent,
  onStatusUpdate
}) => {
  return (
    <div className="flex flex-col">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="px-3 py-2 hover:bg-[#363636] cursor-pointer"
        >
          <button
            onClick={() => onSelectAgent(agent)}
            className="flex items-center w-full"
          >
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-10 h-10 rounded-full"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#2e2e2e] ${
                  agent.status === 'online'
                    ? 'bg-green-500'
                    : agent.status === 'busy'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}
              />
            </div>
            <div className="ml-3 text-left flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm truncate">{agent.name}</p>
                <span className="text-xs text-gray-400">
                  {agent.status === 'online' ? '在线' : '离线'}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">{agent.role}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};
