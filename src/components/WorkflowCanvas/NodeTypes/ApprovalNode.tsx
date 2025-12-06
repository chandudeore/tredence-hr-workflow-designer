import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { CheckCircle, Users } from "lucide-react";
import { ApprovalNodeData } from "../../../types/workflow";

const ApprovalNode: React.FC<NodeProps<ApprovalNodeData>> = ({
  data,
  selected,
}) => {
  return (
    <div className={`approval-node ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="node-icon approval">
          <CheckCircle size={16} />
        </div>
        <div className="node-title">{data.title || "Approval"}</div>
      </div>
      <div className="node-content">
        <div className="node-field">
          <Users size={14} />
          <span>Approver: {data.approverRole}</span>
        </div>
        {data.autoApproveThreshold && (
          <div className="node-field">
            <span>Auto-approve: {data.autoApproveThreshold}%</span>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ApprovalNode;
