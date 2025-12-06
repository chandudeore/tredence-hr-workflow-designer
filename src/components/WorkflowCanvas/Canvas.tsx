import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  ReactFlowInstance,
  OnConnect,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import StartNode from "./NodeTypes/StartNode";
import TaskNode from "./NodeTypes/TaskNode";
import ApprovalNode from "./NodeTypes/ApprovalNode";
import AutomatedNode from "./NodeTypes/AutomatedNode";
import EndNode from "./NodeTypes/EndNode";
import { WorkflowNode as CustomWorkflowNode } from "../../types/workflow";

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

interface WorkflowCanvasProps {
  onNodeSelect: (node: CustomWorkflowNode | null) => void;
  selectedNode: CustomWorkflowNode | null;
  onWorkflowUpdate: (nodes: Node[], edges: Edge[]) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  onNodeSelect,
  selectedNode,
  onWorkflowUpdate,
}) => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Notify parent when workflow changes
  useEffect(() => {
    onWorkflowUpdate(nodes, edges);
  }, [nodes, edges, onWorkflowUpdate]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);
        return newEdges;
      });
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: {
          ...getDefaultNodeData(type),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeSelect(node as CustomWorkflowNode);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const getDefaultNodeData = (type: string) => {
    const defaults = {
      start: {
        title: "Start Workflow",
        label: "Start",
      },
      task: {
        title: "New Task",
        label: "Task",
        description: "Complete this task",
        assignee: "",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        priority: "medium",
      },
      approval: {
        title: "Approval Required",
        label: "Approval",
        approverRole: "Manager",
        requireComments: true,
      },
      automated: {
        title: "Automated Action",
        label: "Automated",
        actionId: "",
        actionLabel: "Select Action",
        actionParams: {},
      },
      end: {
        title: "End Workflow",
        label: "End",
        message: "Workflow Complete",
        generateSummary: true,
        notifyOnComplete: false,
      },
    };
    return defaults[type as keyof typeof defaults] || {};
  };

  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("palette-item")) {
        const type = target.getAttribute("data-type");
        if (type) {
          event.dataTransfer?.setData("application/reactflow", type);
          event.dataTransfer!.effectAllowed = "move";
        }
      }
    };

    document.addEventListener("dragstart", handleDragStart as any);
    return () => {
      document.removeEventListener("dragstart", handleDragStart as any);
    };
  }, []);

  return (
    <div className="canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="workflow-canvas"
      >
        <Background gap={20} size={1} color="#e5e7eb" />
        <Controls className="canvas-controls" showInteractive={false} />
        <MiniMap
          className="canvas-minimap"
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            switch (node.type) {
              case "start":
                return "#10b981";
              case "task":
                return "#3b82f6";
              case "approval":
                return "#f59e0b";
              case "automated":
                return "#8b5cf6";
              case "end":
                return "#ef4444";
              default:
                return "#6b7280";
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
