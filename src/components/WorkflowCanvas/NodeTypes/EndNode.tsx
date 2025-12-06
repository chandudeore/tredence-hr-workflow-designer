import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Flag, Check } from "lucide-react";
import { EndNodeData } from "../../../types/workflow";

const EndNode: React.FC<NodeProps<EndNodeData>> = ({ data, selected }) => {
  return (
    <div className={`end-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="node-icon end">
          <Flag size={16} />
        </div>
        <div className="node-title">{data.title || "End"}</div>
      </div>
      <div className="node-content">
        <div className="node-field">
          <Check size={14} />
          <span>{data.message || "Workflow Complete"}</span>
        </div>
      </div>
    </div>
  );
};

export default EndNode;
