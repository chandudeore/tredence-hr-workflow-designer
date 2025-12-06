import React from "react";
import { ApprovalNodeData } from "../../../types/workflow";

interface ApprovalNodeFormProps {
  data: ApprovalNodeData;
  onChange: (field: keyof ApprovalNodeData, value: any) => void;
}

const ApprovalNodeForm: React.FC<ApprovalNodeFormProps> = ({
  data,
  onChange,
}) => {
  const approverRoles = [
    { value: "Manager", label: "Manager" },
    { value: "HRBP", label: "HR Business Partner" },
    { value: "Director", label: "Director" },
    { value: "Custom", label: "Custom Role" },
  ];

  const [customRole, setCustomRole] = React.useState(
    data.approverRole &&
      !["Manager", "HRBP", "Director"].includes(data.approverRole)
      ? data.approverRole
      : ""
  );

  const handleApproverRoleChange = (value: string) => {
    if (value === "Custom") {
      onChange("approverRole", customRole || "Custom");
    } else {
      onChange("approverRole", value);
    }
  };

  const handleCustomRoleChange = (value: string) => {
    setCustomRole(value);
    if (data.approverRole === "Custom" || data.approverRole === value) {
      onChange("approverRole", value || "Custom");
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
          placeholder="Enter approval step title"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Approver Role <span className="required">*</span>
        </label>
        <select
          className="form-select"
          value={
            data.approverRole === customRole ? "Custom" : data.approverRole
          }
          onChange={(e) => handleApproverRoleChange(e.target.value)}
        >
          {approverRoles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      {data.approverRole === "Custom" && (
        <div className="form-group">
          <label className="form-label">
            Custom Role Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={customRole}
            onChange={(e) => handleCustomRoleChange(e.target.value)}
            placeholder="e.g., Department Head, Team Lead"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Auto-Approve Threshold (%)</label>
        <div className="input-with-suffix">
          <input
            type="number"
            className="form-input"
            value={data.autoApproveThreshold || ""}
            onChange={(e) =>
              onChange(
                "autoApproveThreshold",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            placeholder="0-100"
            min="0"
            max="100"
          />
          <span className="input-suffix">%</span>
        </div>
        <p className="form-hint">
          If set, approval is automatically granted when this percentage of
          approvers agree
        </p>
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="requireComments"
            className="form-checkbox"
            checked={data.requireComments || false}
            onChange={(e) => onChange("requireComments", e.target.checked)}
          />
          <label htmlFor="requireComments" className="checkbox-label">
            Require comments for approval/rejection
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Approval Instructions</label>
        <textarea
          className="form-textarea"
          value={data.instructions || ""}
          onChange={(e) => onChange("instructions", e.target.value)}
          placeholder="Optional instructions for approvers"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ApprovalNodeForm;
