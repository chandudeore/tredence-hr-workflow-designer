import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Play } from "lucide-react";
import { StartNodeData } from "../../../types/workflow";

const StartNode: React.FC<NodeProps<StartNodeData>> = ({ data, selected }) => {
  return (
    <div className={`start-node ${selected ? "selected" : ""}`}>
      <div className="node-header">
        <div className="node-icon start">
          <Play size={16} />
        </div>
        <div className="node-title">{data.title || "Start"}</div>
      </div>
      <div className="node-content">
        <div className="node-subtitle">Workflow Entry Point</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default StartNode;
