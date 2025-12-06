import React from "react";
import { EndNodeData } from "../../../types/workflow";

interface EndNodeFormProps {
  data: EndNodeData;
  onChange: (field: keyof EndNodeData, value: any) => void;
}

const EndNodeForm: React.FC<EndNodeFormProps> = ({ data, onChange }) => {
  return (
    <div className="node-form">
      <div className="form-group">
        <label className="form-label">
          Completion Message <span className="required">*</span>
        </label>
        <textarea
          className="form-textarea"
          value={data.message || ""}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Enter completion message"
          rows={3}
        />
        <p className="form-hint">
          This message will be displayed when the workflow completes
        </p>
      </div>

      <div className="form-section">
        <h4 className="form-section-title">Completion Settings</h4>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="generateSummary"
              className="form-checkbox"
              checked={data.generateSummary || false}
              onChange={(e) => onChange("generateSummary", e.target.checked)}
            />
            <label htmlFor="generateSummary" className="checkbox-label">
              Generate workflow summary report
            </label>
          </div>
          <p className="form-hint">
            Create a detailed summary of workflow execution
          </p>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="notifyOnComplete"
              className="form-checkbox"
              checked={data.notifyOnComplete || false}
              onChange={(e) => onChange("notifyOnComplete", e.target.checked)}
            />
            <label htmlFor="notifyOnComplete" className="checkbox-label">
              Send notification on completion
            </label>
          </div>
          <p className="form-hint">
            Notify stakeholders when workflow completes
          </p>
        </div>
      </div>

      <div className="form-section">
        <h4 className="form-section-title">Post-Completion Actions</h4>

        <div className="form-group">
          <label className="form-label">Archive Duration</label>
          <select
            className="form-select"
            value={data.archiveDuration || "30"}
            onChange={(e) => onChange("archiveDuration", e.target.value)}
          >
            <option value="7">1 Week</option>
            <option value="30">1 Month</option>
            <option value="90">3 Months</option>
            <option value="180">6 Months</option>
            <option value="365">1 Year</option>
            <option value="0">Never Archive</option>
          </select>
          <p className="form-hint">
            How long to keep workflow data before archiving
          </p>
        </div>
      </div>
    </div>
  );
};

export default EndNodeForm;
