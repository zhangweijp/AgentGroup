export type AgentStatus = 'online' | 'offline' | 'busy';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  avatar: string;
  expertise: string[];
  currentTask?: string;              // 新增：当前任务
  workload: number;                  // 新增：工作负载
  responseTime: number;              // 新增：平均响应时间
  customSettings?: Record<string, any>; // 新增：自定义设置
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  mentions: string[];
  type: MessageType;                 // 新增：消息类型
  taskId?: string;                   // 新增：关联任务ID
  attachments?: string[];            // 新增：附件
  replyTo?: string;                  // 新增：回复消息ID
}

export interface Group {
  id: string;
  name: string;
  agents: string[];
  goal: string;
  progress: number;
  tasks: Task[];                     // 新增：群组任务
  createdAt: Date;                   // 新增：创建时间
  updatedAt: Date;                   // 新增：更新时间
}

export type MessageType = 'text' | 'task' | 'notification' | 'system';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  status: TaskStatus;
  priority: number;
  deadline?: Date;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}
