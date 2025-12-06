import React, { useState } from "react";
import { X, Play, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useWorkflow } from "../../hooks/useWorkflow";
import { mockApi } from "../../API/MockApi";
import ExecutionLog from "./ExecutionLog";
import { SimulationStep, Workflow } from "../../types/workflow";

interface TestPanelProps {
  onClose: () => void;
  workflow: Workflow;
}

const TestPanel: React.FC<TestPanelProps> = ({ onClose, workflow }) => {
  const { validateWorkflow, exportWorkflow } = useWorkflow();
  const [isTesting, setIsTesting] = useState(false);
  const [executionLog, setExecutionLog] = useState<SimulationStep[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<any>(null);

  const handleTestWorkflow = async () => {
    const validationErrors = validateWorkflow(workflow);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsTesting(true);
    setExecutionLog([]);

    try {
      const result = await mockApi.simulateWorkflow(workflow);
      setExecutionLog(result);

      // Calculate test results
      const totalSteps = result.length;
      const completedSteps = result.filter(
        (step) => step.status === "completed"
      ).length;
      const failedSteps = result.filter(
        (step) => step.status === "failed"
      ).length;

      setTestResults({
        totalSteps,
        completedSteps,
        failedSteps,
        successRate:
          totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0,
      });
    } catch (error) {
      console.error("Simulation failed:", error);
      setErrors(["Simulation failed. Please try again."]);
    } finally {
      setIsTesting(false);
    }
  };

  const handleExport = () => {
    exportWorkflow(workflow);
  };

  return (
    <div className="test-panel-overlay">
      <div className="test-panel">
        <div className="panel-header">
          <div className="panel-title">
            <Play size={20} />
            <h2>Test Workflow</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="panel-content">
          <div className="workflow-info">
            <div className="info-item">
              <span className="info-label">Workflow Name:</span>
              <span className="info-value">{workflow.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Nodes:</span>
              <span className="info-value">{workflow.nodes.length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Connections:</span>
              <span className="info-value">{workflow.edges.length}</span>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="error-section">
              <div className="error-header">
                <AlertCircle size={18} />
                <h3>Validation Errors</h3>
              </div>
              <ul className="error-list">
                {errors.map((error, index) => (
                  <li key={index} className="error-item">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {testResults && (
            <div className="results-summary">
              <div className="result-card">
                <div className="result-value">{testResults.totalSteps}</div>
                <div className="result-label">Total Steps</div>
              </div>
              <div className="result-card">
                <div className="result-value success">
                  {testResults.completedSteps}
                </div>
                <div className="result-label">Completed</div>
              </div>
              <div className="result-card">
                <div className="result-value warning">
                  {testResults.failedSteps}
                </div>
                <div className="result-label">Failed</div>
              </div>
              <div className="result-card">
                <div className="result-value">{testResults.successRate}%</div>
                <div className="result-label">Success Rate</div>
              </div>
            </div>
          )}

          <div className="actions-section">
            <div className="action-buttons">
              <button
                onClick={handleTestWorkflow}
                disabled={isTesting}
                className="btn-primary"
              >
                {isTesting ? (
                  <>
                    <Clock size={16} />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Run Test</span>
                  </>
                )}
              </button>
              <button onClick={handleExport} className="btn-secondary">
                Export as JSON
              </button>
            </div>
          </div>

          {executionLog.length > 0 && <ExecutionLog steps={executionLog} />}
        </div>
      </div>
    </div>
  );
};

export default TestPanel;
