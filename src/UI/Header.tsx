import React from "react";
import { Settings, User, Bell, HelpCircle } from "lucide-react";

interface HeaderProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onTestWorkflow: () => void;
  onSave: () => void;
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({
  workflowName,
  onWorkflowNameChange,
  onTestWorkflow,
  onSave,
  onExport,
}) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">Workflow Designer</span>
        </div>

        <div className="workflow-info">
          <input
            type="text"
            className="workflow-name-input"
            value={workflowName}
            onChange={(e) => onWorkflowNameChange(e.target.value)}
          />
          <span className="workflow-status">Draft</span>
        </div>
      </div>

      <div className="header-center">
        <div className="header-actions">
          <button className="header-btn" onClick={onSave}>
            <span>💾</span>
            <span>Save</span>
          </button>
          <button className="header-btn" onClick={onTestWorkflow}>
            <span>▶️</span>
            <span>Test</span>
          </button>
          <button className="header-btn" onClick={onExport}>
            <span>📥</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn">
          <HelpCircle size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn">
          <Settings size={20} />
        </button>
        <div className="user-avatar">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
