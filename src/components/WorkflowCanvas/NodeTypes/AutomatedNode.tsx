import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Zap, Settings } from "lucide-react";
import { AutomatedNodeData } from "../../../types/workflow";

const AutomatedNode: React.FC<NodeProps<AutomatedNodeData>> = ({
  data,
  selected,
}) => {
  return (
    <div className={`automated-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="node-icon automated">
          <Zap size={16} />
        </div>
        <div className="node-title">{data.title || "Automated"}</div>
      </div>
      <div className="node-content">
        <div className="node-field">
          <Settings size={14} />
          <span>{data.actionLabel || "Select Action"}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AutomatedNode;
