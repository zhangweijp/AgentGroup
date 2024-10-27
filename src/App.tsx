import React from 'react';
import { ChatWindow } from './components/Chat/ChatWindow';
import { AgentList } from './components/Sidebar/AgentList';
import { MessageInput } from './components/Input/MessageInput';
import { TaskPanel } from './components/Task/TaskPanel';
import { Agent, Message, Group, Task, AgentStatus, MessageType } from './types';
import { 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon, 
  ArrowsPointingOutIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      content: '你好，我是数据分析助手',
      senderId: '1',
      timestamp: new Date(),
      status: 'read',
      mentions: [],
      type: 'text',
    },
    {
      id: '2',
      content: '有什么可以帮你的吗？',
      senderId: '1',
      timestamp: new Date(),
      status: 'read',
      mentions: [],
      type: 'text',
    },
  ]);

  const [agents, setAgents] = React.useState<Agent[]>([
    {
      id: '1',
      name: '数据分析助手',
      role: '数据分析',
      status: 'online',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=1',
      expertise: ['数据分析', '可视化'],
      workload: 0,
      responseTime: 1000,
    },
    {
      id: '2',
      name: '代码助手',
      role: '编程开发',
      status: 'online',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=2',
      expertise: ['React', 'TypeScript'],
      workload: 0,
      responseTime: 1000,
    },
  ]);

  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [showTaskPanel, setShowTaskPanel] = React.useState(false);

  const handleSendMessage = (content: string, mentions: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: 'user',
      timestamp: new Date(),
      status: 'sent',
      mentions,
      type: 'text' as MessageType,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCreateTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleAgentStatusUpdate = (agentId: string, status: AgentStatus) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === agentId ? { ...agent, status } : agent
      )
    );
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
  };

  return (
    <div className="flex h-screen bg-chat-bg">
      {/* 左侧导航栏 */}
      <nav className="w-[240px] bg-white border-r border-gray-200">
        <div className="h-14 bg-gradient-primary flex items-center px-4">
          <h1 className="text-white text-lg font-medium">PlantUML AI Assistant</h1>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-700 font-medium">Chats</h2>
            <button className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          <AgentList
            agents={agents}
            onSelectAgent={setSelectedAgent}
            onStatusUpdate={handleAgentStatusUpdate}
          />
        </div>
      </nav>

      {/* 主聊天区域 */}
      <main className="flex-1 flex flex-col bg-chat-bg">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
          <div className="flex items-center space-x-2">
            {selectedAgent && (
              <>
                <img src={selectedAgent.avatar} alt={selectedAgent.name} className="w-8 h-8 rounded-full" />
                <span className="font-medium text-gray-700">{selectedAgent.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowDownTrayIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowsPointingOutIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex">
          <ChatWindow messages={messages} currentUserId="user" />
          {showTaskPanel && (
            <TaskPanel tasks={tasks} agents={agents} onTaskUpdate={handleTaskUpdate} />
          )}
        </div>

        <MessageInput 
          onSendMessage={handleSendMessage} 
          agents={agents}
          selectedAgent={selectedAgent}
        />
      </main>
    </div>
  );
};

export default App;
