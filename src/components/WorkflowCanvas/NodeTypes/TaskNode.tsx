import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Clipboard, User, Calendar } from "lucide-react";
import { TaskNodeData } from "../../../types/workflow";

const TaskNode: React.FC<NodeProps<TaskNodeData>> = ({ data, selected }) => {
  const priorityColors = {
    low: "#10b981",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  return (
    <div className={`task-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="node-icon task">
          <Clipboard size={16} />
        </div>
        <div className="node-title">{data.title || "Task"}</div>
        {data.priority && (
          <div
            className="priority-badge"
            style={{ backgroundColor: priorityColors[data.priority] }}
          >
            {data.priority}
          </div>
        )}
      </div>
      <div className="node-content">
        <div className="node-field">
          <User size={14} />
          <span>{data.assignee || "Unassigned"}</span>
        </div>
        {data.dueDate && (
          <div className="node-field">
            <Calendar size={14} />
            <span>Due: {new Date(data.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TaskNode;
