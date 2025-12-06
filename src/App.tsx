import { BarChart3, Download, Play, Save } from "lucide-react";
import { useCallback, useState } from "react";
import NodeEditor from "./components/NodeEditor/NodeEditor";
import WorkflowCanvas from "./components/WorkflowCanvas/Canvas";
import TestPanel from "./components/WorkflowTest/TestPanel";
import "./styles/global.css";
import { Workflow, WorkflowNode } from "./types/workflow";
import Header from "./UI/Header";
import MetricCard from "./UI/MetricCard";

function App() {
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("Onboarding Workflow");
  const [workflow, setWorkflow] = useState<Workflow>({
    name: "Onboarding Workflow",
    nodes: [],
    edges: [],
  });

  const handleWorkflowUpdate = useCallback((nodes: any[], edges: any[]) => {
    setWorkflow((prev) => ({
      ...prev,
      nodes,
      edges,
    }));
  }, []);

  const handleSave = () => {
    console.log("Saving workflow:", workflow);
    // Here you would typically send to backend
    alert("Workflow saved!");
  };

  const handleExport = () => {
    const workflowJson = JSON.stringify(workflow, null, 2);
    const blob = new Blob([workflowJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${workflowName.replace(/\s+/g, "-").toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="app">
      <Header
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onTestWorkflow={() => setIsTestPanelOpen(true)}
        onSave={handleSave}
        onExport={handleExport}
      />

      <div className="main-container">
        <div className="left-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <Play size={16} />
              <span>Start Nodes</span>
            </h3>
            <div className="node-palette">
              <div
                className="palette-item"
                draggable
                data-type="start"
                onDragStart={(e) => onDragStart(e, "start")}
              >
                <div className="palette-icon">▶️</div>
                <span>Start</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <BarChart3 size={16} />
              <span>Task Nodes</span>
            </h3>
            <div className="node-palette">
              <div
                className="palette-item"
                draggable
                data-type="task"
                onDragStart={(event) => onDragStart(event, "task")}
              >
                <div className="palette-icon">📋</div>
                <span>Task</span>
              </div>
              <div
                className="palette-item"
                draggable
                data-type="approval"
                onDragStart={(event) => onDragStart(event, "approval")}
              >
                <div className="palette-icon">✅</div>
                <span>Approval</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <span>System Nodes</span>
            </h3>
            <div className="node-palette">
              <div
                className="palette-item"
                draggable
                onDragStart={(event) => onDragStart(event, "automated")}
                data-type="automated"
              >
                <div className="palette-icon">⚡</div>
                <span>Automated</span>
              </div>
              <div
                className="palette-item"
                draggable
                onDragStart={(event) => onDragStart(event, "end")}
                data-type="end"
              >
                <div className="palette-icon">🏁</div>
                <span>End</span>
              </div>
            </div>
          </div>

          <div className="metrics-section">
            <h3 className="sidebar-title">Workflow Metrics</h3>
            <div className="metrics-grid">
              <MetricCard
                title="Avg. Sessions per Week"
                current="44.4%"
                previous="433.3"
                trend="up"
                color="bright"
              />
              <MetricCard
                title="Avg. Session Duration"
                current="50/500"
                previous="Goal for 2023"
                trend="neutral"
                color="bright"
              />
              <MetricCard
                title="Avg. Shares per Session"
                current="40.37"
                previous="684.81"
                trend="down"
                color="bright"
              />
              <MetricCard
                title="Premium Trial Users"
                current="4,579"
                previous="25,958"
                trend="up"
                color="bright"
              />
            </div>
          </div>
        </div>

        <div className="canvas-area">
          <WorkflowCanvas
            onNodeSelect={setSelectedNode}
            selectedNode={selectedNode}
            onWorkflowUpdate={handleWorkflowUpdate}
          />
        </div>

        <div className="right-sidebar">
          {selectedNode ? (
            <NodeEditor
              node={selectedNode}
              onUpdate={() => console.log("Node updated")}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <div className="empty-editor">
              <div className="empty-state">
                <div className="empty-icon">👈</div>
                <h3>Select a Node</h3>
                <p>
                  Click on any node in the workflow to configure its properties
                </p>
                <div className="empty-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Nodes</span>
                    <span className="stat-value">{workflow.nodes.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Connections</span>
                    <span className="stat-value">{workflow.edges.length}</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <button
                  className="action-btn"
                  onClick={() => setIsTestPanelOpen(true)}
                >
                  <Play size={16} />
                  Test Workflow
                </button>
                <button className="action-btn" onClick={handleSave}>
                  <Save size={16} />
                  Save Draft
                </button>
                <button className="action-btn" onClick={handleExport}>
                  <Download size={16} />
                  Export JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isTestPanelOpen && (
        <TestPanel
          onClose={() => setIsTestPanelOpen(false)}
          workflow={workflow}
        />
      )}
    </div>
  );
}

export default App;
