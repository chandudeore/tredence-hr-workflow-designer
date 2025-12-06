import { AutomationAction, SimulationStep } from "../types/workflow";

const automationActions: AutomationAction[] = [
  {
    id: "send_email",
    label: "Send Email",
    description: "Send email notification",
    params: [
      { name: "to", type: "string", required: true },
      { name: "subject", type: "string", required: true },
      { name: "body", type: "string", required: true },
    ],
  },
  {
    id: "generate_doc",
    label: "Generate Document",
    description: "Generate document from template",
    params: [
      { name: "template", type: "string", required: true },
      { name: "recipient", type: "string", required: true },
    ],
  },
  {
    id: "notify_slack",
    label: "Notify on Slack",
    description: "Send notification to Slack channel",
    params: [
      { name: "channel", type: "string", required: true },
      { name: "message", type: "string", required: true },
    ],
  },
  {
    id: "update_hr_system",
    label: "Update HR System",
    description: "Update employee record in HR system",
    params: [
      { name: "field", type: "string", required: true },
      { name: "value", type: "string", required: true },
    ],
  },
  {
    id: "schedule_meeting",
    label: "Schedule Meeting",
    description: "Schedule calendar meeting",
    params: [
      { name: "attendees", type: "string", required: true },
      { name: "duration", type: "number", required: true },
    ],
  },
];

class MockApi {
  async getAutomations(): Promise<AutomationAction[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(automationActions), 300);
    });
  }

  async simulateWorkflow(workflow: any): Promise<SimulationStep[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const steps: SimulationStep[] = [
          {
            id: "step_1",
            nodeId: "start_1",
            nodeType: "start",
            action: "Workflow started successfully",
            timestamp: new Date(),
            status: "completed",
            duration: 100,
          },
          {
            id: "step_2",
            nodeId: "task_1",
            nodeType: "task",
            action:
              'Task "Complete Documentation" assigned to john.doe@company.com',
            timestamp: new Date(Date.now() + 1000),
            status: "running",
            duration: 500,
          },
          {
            id: "step_3",
            nodeId: "approval_1",
            nodeType: "approval",
            action: "Waiting for manager approval",
            timestamp: new Date(Date.now() + 2000),
            status: "pending",
          },
          {
            id: "step_4",
            nodeId: "automated_1",
            nodeType: "automated",
            action: "Sending email notification to HR department",
            timestamp: new Date(Date.now() + 3000),
            status: "completed",
            duration: 200,
          },
          {
            id: "step_5",
            nodeId: "end_1",
            nodeType: "end",
            action: "Workflow completed successfully",
            timestamp: new Date(Date.now() + 4000),
            status: "completed",
            duration: 50,
          },
        ];
        resolve(steps);
      }, 1000);
    });
  }
}

export const mockApi = new MockApi();
