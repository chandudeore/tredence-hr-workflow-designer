import React from "react";
import { TaskNodeData } from "../../../types/workflow";

interface TaskNodeFormProps {
  data: TaskNodeData;
  onChange: (field: keyof TaskNodeData, value: any) => void;
}

const TaskNodeForm: React.FC<TaskNodeFormProps> = ({ data, onChange }) => {
  const [customFields, setCustomFields] = React.useState<
    Array<{ key: string; value: string }>
  >(
    data.customFields
      ? Object.entries(data.customFields).map(([key, value]) => ({
          key,
          value,
        }))
      : []
  );

  const handleAddField = () => {
    const newFields = [...customFields, { key: "", value: "" }];
    setCustomFields(newFields);
    updateCustomFields(newFields);
  };

  const handleRemoveField = (index: number) => {
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
    updateCustomFields(newFields);
  };

  const handleFieldChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newFields = [...customFields];
    newFields[index][field] = value;
    setCustomFields(newFields);
    updateCustomFields(newFields);
  };

  const updateCustomFields = (
    fields: Array<{ key: string; value: string }>
  ) => {
    const customFieldsObj: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.key.trim()) {
        customFieldsObj[field.key] = field.value;
      }
    });
    onChange(
      "customFields",
      Object.keys(customFieldsObj).length > 0 ? customFieldsObj : undefined
    );
  };

  React.useEffect(() => {
    if (data.customFields && Object.keys(data.customFields).length > 0) {
      setCustomFields(
        Object.entries(data.customFields).map(([key, value]) => ({
          key,
          value,
        }))
      );
    }
  }, [data.customFields]);

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
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          value={data.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Assignee <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={data.assignee || ""}
            onChange={(e) => onChange("assignee", e.target.value)}
            placeholder="e.g., john.doe@company.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            value={data.priority || "medium"}
            onChange={(e) => onChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-input"
          value={data.dueDate || ""}
          onChange={(e) => onChange("dueDate", e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <h4 className="form-section-title">Custom Fields</h4>
          <button
            type="button"
            className="btn-outline btn-sm"
            onClick={handleAddField}
          >
            + Add Field
          </button>
        </div>

        <div className="custom-fields">
          {customFields.length === 0 ? (
            <div className="empty-custom-fields">
              <p>No custom fields defined</p>
              <p className="form-hint">
                Add custom fields to capture additional task information
              </p>
            </div>
          ) : (
            customFields.map((field, index) => (
              <div key={index} className="custom-field-row">
                <input
                  type="text"
                  className="form-input"
                  value={field.key}
                  onChange={(e) =>
                    handleFieldChange(index, "key", e.target.value)
                  }
                  placeholder="Field name"
                />
                <input
                  type="text"
                  className="form-input"
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, "value", e.target.value)
                  }
                  placeholder="Field value"
                />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => handleRemoveField(index)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Estimated Duration (hours)</label>
        <input
          type="number"
          className="form-input"
          value={data.estimatedHours || ""}
          onChange={(e) =>
            onChange(
              "estimatedHours",
              e.target.value ? parseInt(e.target.value) : undefined
            )
          }
          placeholder="e.g., 2"
          min="0"
        />
      </div>
    </div>
  );
};

export default TaskNodeForm;
