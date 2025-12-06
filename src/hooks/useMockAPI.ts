import { useState, useCallback } from "react";
import { mockApi } from "../API/MockApi";
import { AutomationAction, SimulationStep } from "../types/workflow";

export const useMockApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAutomations = useCallback(async (): Promise<AutomationAction[]> => {
    setLoading(true);
    setError(null);
    try {
      const result = await mockApi.getAutomations();
      return result;
    } catch (err) {
      setError("Failed to fetch automations");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const simulateWorkflow = useCallback(
    async (workflow: any): Promise<SimulationStep[]> => {
      setLoading(true);
      setError(null);
      try {
        const result = await mockApi.simulateWorkflow(workflow);
        return result;
      } catch (err) {
        setError("Failed to simulate workflow");
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    getAutomations,
    simulateWorkflow,
    loading,
    error,
  };
};
