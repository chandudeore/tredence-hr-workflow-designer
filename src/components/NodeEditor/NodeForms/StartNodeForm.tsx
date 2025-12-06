import React from "react";
import { StartNodeData } from "../../../types/workflow";

interface StartNodeFormProps {
  data: StartNodeData;
  onChange: (field: keyof StartNodeData, value: any) => void;
}

const StartNodeForm: React.FC<StartNodeFormProps> = ({ data, onChange }) => {
  const [customFields, setCustomFields] = React.useState<
    Array<{ key: string; value: string }>
  >(
    data.metadata
      ? Object.entries(data.metadata).map(([key, value]) => ({ key, value }))
      : []
  );

  const handleAddField = () => {
    const newFields = [...customFields, { key: "", value: "" }];
    setCustomFields(newFields);
    updateMetadata(newFields);
  };

  const handleRemoveField = (index: number) => {
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
    updateMetadata(newFields);
  };

  const handleFieldChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newFields = [...customFields];
    newFields[index][field] = value;
    setCustomFields(newFields);
    updateMetadata(newFields);
  };

  const updateMetadata = (fields: Array<{ key: string; value: string }>) => {
    const metadata: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.key.trim()) {
        metadata[field.key] = field.value;
      }
    });
    onChange(
      "metadata",
      Object.keys(metadata).length > 0 ? metadata : undefined
    );
  };

  React.useEffect(() => {
    if (data.metadata && Object.keys(data.metadata).length > 0) {
      setCustomFields(
        Object.entries(data.metadata).map(([key, value]) => ({ key, value }))
      );
    }
  }, [data.metadata]);

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
          placeholder="Enter workflow start title"
        />
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <h4 className="form-section-title">Custom Metadata</h4>
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
              <p>No custom metadata defined</p>
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
                  placeholder="Key"
                />
                <input
                  type="text"
                  className="form-input"
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, "value", e.target.value)
                  }
                  placeholder="Value"
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
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          value={data.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Optional description for the start node"
          rows={2}
        />
      </div>
    </div>
  );
};

export default StartNodeForm;
