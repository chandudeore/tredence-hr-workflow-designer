import { useCallback } from "react";
import { Workflow, WorkflowValidation } from "../types/workflow";

// Create a context or prop-based workflow management
export const useWorkflow = () => {
  const validateWorkflow = useCallback((workflow: Workflow): string[] => {
    const errors: string[] = [];

    if (workflow.nodes.length === 0) {
      errors.push("Workflow must have at least one node");
      return errors;
    }

    const startNodes = workflow.nodes.filter((node) => node.type === "start");
    if (startNodes.length === 0) {
      errors.push("Workflow must have a Start node");
    } else if (startNodes.length > 1) {
      errors.push("Workflow can only have one Start node");
    }

    const endNodes = workflow.nodes.filter((node) => node.type === "end");
    if (endNodes.length === 0) {
      errors.push("Workflow must have an End node");
    }

    const connectedNodeIds = new Set<string>();
    workflow.edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    workflow.nodes.forEach((node) => {
      if (node.type !== "start" && node.type !== "end") {
        const hasIncoming = workflow.edges.some(
          (edge) => edge.target === node.id
        );
        const hasOutgoing = workflow.edges.some(
          (edge) => edge.source === node.id
        );

        if (!hasIncoming) {
          errors.push(`Node "${node.data.label}" has no incoming connection`);
        }
        if (!hasOutgoing) {
          errors.push(`Node "${node.data.label}" has no outgoing connection`);
        }
      }
    });

    return errors;
  }, []);

  const exportWorkflow = useCallback((workflow: Workflow) => {
    const workflowJson = JSON.stringify(workflow, null, 2);

    const blob = new Blob([workflowJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `workflow-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const importWorkflow = useCallback((json: string): Workflow | null => {
    try {
      const workflow = JSON.parse(json);
      if (workflow.nodes && workflow.edges) {
        return workflow;
      }
    } catch (error) {
      console.error("Failed to import workflow:", error);
    }
    return null;
  }, []);

  return {
    validateWorkflow,
    exportWorkflow,
    importWorkflow,
  };
};
