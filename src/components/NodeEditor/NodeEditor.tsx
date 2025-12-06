import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { WorkflowNode, NodeType } from "../../types/workflow";
import StartNodeForm from "./NodeForms/StartNodeForm";
import TaskNodeForm from "./NodeForms/TaskNodeForm";
import ApprovalNodeForm from "./NodeForms/ApprovalNodeForm";
import AutomatedNodeForm from "./NodeForms/AutomatedNodeForm";
import EndNodeForm from "./NodeForms/EndNodeForm";

interface NodeEditorProps {
  node: WorkflowNode | null;
  onUpdate: (node: WorkflowNode) => void;
  onClose: () => void;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ node, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<any>(node?.data || {});

  useEffect(() => {
    if (node) {
      setFormData(node.data);
    }
  }, [node]);

  if (!node) return null;

  const handleFormChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Update the node with new data
    const updatedNode = {
      ...node,
      data: newData,
    };
    onUpdate(updatedNode);
  };

  const handleReset = () => {
    setFormData(node.data);
  };

  const handleApplyChanges = () => {
    // This would typically save to backend
    console.log("Applying changes to node:", node.id, formData);
    alert("Changes applied!");
  };

  const renderForm = () => {
    switch (node.type) {
      case "start":
        return <StartNodeForm data={formData} onChange={handleFormChange} />;
      case "task":
        return <TaskNodeForm data={formData} onChange={handleFormChange} />;
      case "approval":
        return <ApprovalNodeForm data={formData} onChange={handleFormChange} />;
      case "automated":
        return (
          <AutomatedNodeForm data={formData} onChange={handleFormChange} />
        );
      case "end":
        return <EndNodeForm data={formData} onChange={handleFormChange} />;
      default:
        return <div>Unknown node type</div>;
    }
  };

  return (
    <div className="node-editor">
      <div className="editor-header">
        <h3>
          <span className="node-type-badge">{node.type}</span>
          Node Configuration
        </h3>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="editor-content">
        <div className="node-info">
          <div className="info-item">
            <span className="info-label">Node ID:</span>
            <span className="info-value">{node.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Position:</span>
            <span className="info-value">
              {Math.round(node.position.x)}, {Math.round(node.position.y)}
            </span>
          </div>
        </div>

        <div className="form-section">{renderForm()}</div>

        <div className="editor-actions">
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-primary" onClick={handleApplyChanges}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeEditor;
