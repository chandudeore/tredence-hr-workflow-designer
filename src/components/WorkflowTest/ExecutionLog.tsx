import React from "react";
import { CheckCircle, XCircle, Clock, Play } from "lucide-react";
import { SimulationStep } from "../../types/workflow";

interface ExecutionLogProps {
  steps: SimulationStep[];
}

const ExecutionLog: React.FC<ExecutionLogProps> = ({ steps }) => {
  const getStatusIcon = (status: SimulationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="status-icon completed" />;
      case "failed":
        return <XCircle size={16} className="status-icon failed" />;
      case "running":
        return <Play size={16} className="status-icon running" />;
      default:
        return <Clock size={16} className="status-icon pending" />;
    }
  };

  const getStatusColor = (status: SimulationStep["status"]) => {
    switch (status) {
      case "completed":
        return "var(--success)";
      case "failed":
        return "var(--error)";
      case "running":
        return "var(--warning)";
      default:
        return "var(--text-secondary)";
    }
  };

  return (
    <div className="execution-log">
      <h3 className="log-title">Execution Log</h3>
      <div className="log-timeline">
        {steps.map((step, index) => (
          <div key={step.id} className="log-step">
            <div className="step-header">
              <div className="step-marker">
                {getStatusIcon(step.status)}
                {index < steps.length - 1 && (
                  <div
                    className="step-connector"
                    style={{ backgroundColor: getStatusColor(step.status) }}
                  />
                )}
              </div>
              <div className="step-info">
                <div className="step-title">{step.action}</div>
                <div className="step-meta">
                  <span className="step-type">{step.nodeType}</span>
                  <span className="step-time">
                    {step.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutionLog;
