import React, { useState, useEffect } from "react";
import { AutomatedNodeData } from "../../../types/workflow";
import { mockApi } from "../../../API/MockApi";

interface AutomationAction {
  id: string;
  label: string;
  description: string;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
}

interface AutomatedNodeFormProps {
  data: AutomatedNodeData;
  onChange: (field: keyof AutomatedNodeData, value: any) => void;
}

const AutomatedNodeForm: React.FC<AutomatedNodeFormProps> = ({
  data,
  onChange,
}) => {
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<AutomationAction | null>(
    null
  );

  useEffect(() => {
    loadActions();
  }, []);

  useEffect(() => {
    if (data.actionId && actions.length > 0) {
      const action = actions.find((a) => a.id === data.actionId);
      setSelectedAction(action || null);
    }
  }, [actions, data.actionId]);

  const loadActions = async () => {
    try {
      setLoading(true);
      const fetchedActions = await mockApi.getAutomations();
      setActions(fetchedActions);
    } catch (error) {
      console.error("Failed to load actions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionChange = (actionId: string) => {
    const action = actions.find((a) => a.id === actionId);
    setSelectedAction(action || null);

    // Reset params when action changes
    const defaultParams: Record<string, string> = {};
    action?.params.forEach((param) => {
      defaultParams[param.name] = "";
    });

    onChange("actionId", actionId);
    onChange("actionLabel", action?.label || "");
    onChange("actionParams", defaultParams);
  };

  const handleParamChange = (paramName: string, value: string) => {
    const newParams = { ...data.actionParams, [paramName]: value };
    onChange("actionParams", newParams);
  };

  const getInputType = (type: string) => {
    switch (type) {
      case "number":
        return "number";
      case "boolean":
        return "checkbox";
      case "date":
        return "date";
      default:
        return "text";
    }
  };

  return (
    <div className="node-form">
      <div className="form-group">
        <label className="form-label">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          value={data.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Enter automated action title"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Automated Action <span className="required">*</span>
        </label>
        {loading ? (
          <div className="loading-state">Loading actions...</div>
        ) : (
          <select
            className="form-select"
            value={data.actionId || ""}
            onChange={(e) => handleActionChange(e.target.value)}
          >
            <option value="">Select an action</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        )}
        {selectedAction && (
          <p className="form-hint">{selectedAction.description}</p>
        )}
      </div>

      {selectedAction && (
        <div className="form-section">
          <h4 className="form-section-title">Action Parameters</h4>
          {selectedAction.params.map((param) => (
            <div key={param.name} className="form-group">
              <label className="form-label">
                {param.name}
                {param.required && <span className="required">*</span>}
              </label>

              {param.type === "boolean" ? (
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id={param.name}
                    className="form-checkbox"
                    checked={data.actionParams[param.name] === "true"}
                    onChange={(e) =>
                      handleParamChange(param.name, e.target.checked.toString())
                    }
                  />
                  <label htmlFor={param.name} className="checkbox-label">
                    {param.name}
                  </label>
                </div>
              ) : (
                <input
                  type={getInputType(param.type)}
                  className="form-input"
                  value={data.actionParams[param.name] || ""}
                  onChange={(e) => {
                    const value =
                      param.type === "checkbox"
                        ? e.target.checked.toString()
                        : e.target.value;
                    handleParamChange(param.name, value);
                  }}
                  placeholder={`Enter ${param.name}`}
                  required={param.required}
                  min={param.type === "number" ? "0" : undefined}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="form-section">
        <h4 className="form-section-title">Execution Settings</h4>

        <div className="form-group">
          <label className="form-label">Retry Attempts</label>
          <input
            type="number"
            className="form-input"
            value={data.retryAttempts || 0}
            onChange={(e) =>
              onChange("retryAttempts", parseInt(e.target.value) || 0)
            }
            min="0"
            max="5"
          />
          <p className="form-hint">Number of retry attempts if action fails</p>
        </div>

        <div className="form-group">
          <label className="form-label">Timeout (seconds)</label>
          <input
            type="number"
            className="form-input"
            value={data.timeout || 30}
            onChange={(e) =>
              onChange("timeout", parseInt(e.target.value) || 30)
            }
            min="5"
            max="300"
          />
          <p className="form-hint">
            Maximum time to wait for action completion
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutomatedNodeForm;
