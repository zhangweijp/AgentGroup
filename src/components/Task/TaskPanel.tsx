import React from 'react';
import { Task, Agent, TaskStatus } from '../../types';

interface TaskPanelProps {
  tasks: Task[];
  agents: Agent[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({ tasks, agents, onTaskUpdate }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    onTaskUpdate(taskId, { status, updatedAt: new Date() });
  };

  const handleProgressUpdate = (taskId: string, progress: number) => {
    onTaskUpdate(taskId, { progress, updatedAt: new Date() });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Tasks</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tasks.map(task => (
          <div key={task.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{task.title}</h3>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                className={`text-sm px-2 py-1 rounded ${statusColors[task.status]}`}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            
            <div className="mb-2">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={task.progress}
                  onChange={(e) => handleProgressUpdate(task.id, Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">{task.progress}%</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {task.assignedTo.map(agentId => {
                const agent = agents.find(a => a.id === agentId);
                return agent ? (
                  <span
                    key={agent.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
                  >
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-4 h-4 rounded-full mr-1"
                    />
                    {agent.name}
                  </span>
                ) : null;
              })}
            </div>
            
            {task.deadline && (
              <div className="text-sm text-gray-500 mt-2">
                Due: {new Date(task.deadline).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
