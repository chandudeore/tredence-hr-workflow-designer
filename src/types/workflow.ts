export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface Position {
  x: number;
  y: number;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: Position;
  data: NodeData;
}

export interface NodeData {
  label: string;
  [key: string]: any;
}

export interface StartNodeData extends NodeData {
  title: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends NodeData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends NodeData {
  title: string;
  approverRole: "Manager" | "HRBP" | "Director" | "Custom";
  autoApproveThreshold?: number;
  requireComments: boolean;
}

export interface AutomatedNodeData extends NodeData {
  title: string;
  actionId: string;
  actionLabel: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends NodeData {
  message: string;
  generateSummary: boolean;
  notifyOnComplete: boolean;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
}

export interface Workflow {
  id?: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AutomationAction {
  id: string;
  label: string;
  description: string;
  params: Array<{
    name: string;
    type: "string" | "number" | "boolean" | "date";
    required: boolean;
  }>;
}

export interface SimulationStep {
  id: string;
  nodeId: string;
  nodeType: NodeType;
  action: string;
  timestamp: Date;
  status: "pending" | "running" | "completed" | "failed";
  result?: any;
  duration?: number;
}

export interface WorkflowValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
// Add these to the existing interfaces

export interface StartNodeData extends NodeData {
  title: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends NodeData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  estimatedHours?: number;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends NodeData {
  title: string;
  approverRole: "Manager" | "HRBP" | "Director" | "Custom";
  autoApproveThreshold?: number;
  requireComments: boolean;
  instructions?: string;
}

export interface AutomatedNodeData extends NodeData {
  title: string;
  actionId: string;
  actionLabel: string;
  actionParams: Record<string, string>;
  retryAttempts?: number;
  timeout?: number;
}

export interface EndNodeData extends NodeData {
  message: string;
  generateSummary: boolean;
  notifyOnComplete: boolean;
  archiveDuration?: string;
}
