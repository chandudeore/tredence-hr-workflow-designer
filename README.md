HR Workflow Designer - Complete Project
📋 Overview
A modern, drag-and-drop HR workflow designer built with React + React Flow that allows HR administrators to visually create and test internal workflows such as onboarding, leave approval, or document verification processes.

🏗️ Architecture
Tech Stack
Frontend: React 18, TypeScript, Vite

UI Library: React Flow 11.10.0 (for workflow visualization)

Styling: CSS Modules with CSS Custom Properties

Icons: Lucide React

Date Handling: date-fns

Build Tool: Vite

Data Flow
State Management: Local React state with prop drilling for simplicity

Workflow Data: Centralized in App component, passed down to children

Real-time Updates: Form changes immediately update canvas nodes

Mock API Layer: Simulated backend with async operations

Key Features Implemented
✅ Drag-and-drop workflow canvas with 5 custom node types

✅ Real-time node configuration with immediate UI updates

✅ Workflow validation and testing simulation

✅ Export/Import workflow as JSON

✅ Professional UI matching design specifications

✅ Type-safe with comprehensive TypeScript interfaces

✅ Responsive and accessible design

🚀 How to Run
Prerequisites
Node.js 16+ and npm/yarn installed

Installation
bash

# Clone the repository (if applicable)

# cd into project directory

# Install dependencies

npm install

# Start development server

npm run dev

# Build for production

npm run build

# Preview production build

npm run preview
Development Server
The application will be available at http://localhost:3000

Quick Start Guide
Drag nodes from the left sidebar onto the canvas

Connect nodes by dragging from handle to handle

Click nodes to configure properties in the right panel

Test workflow using the Test button

Export/Import workflows as JSON files

🎯 Design Decisions

1. Technology Choices
   React Flow: Chosen for its mature ecosystem, excellent drag-and-drop support, and built-in features like minimap and controls

TypeScript: For type safety and better developer experience

Vite: For fast development builds and excellent React support

CSS Custom Properties: For easy theming and maintainable styles

2. State Management Approach
   Local State: Used for simplicity in this prototype

React Flow State: Leveraged for node/edge management within the canvas

Centralized Data Flow: Workflow data managed in App component and passed down

3. Component Architecture
   Modular Design: Each node type has its own component and form

Reusable Components: FormField, MetricCard, Button components

Separation of Concerns: Canvas logic, form logic, and API logic separated

4. Form Design
   Dynamic Forms: Each node type has specific form fields

Real-time Updates: Form changes immediately reflected in UI

Validation: Basic validation for required fields

Type Safety: Form data strongly typed with TypeScript

5. Mock API Design
   Simulated Async Operations: Realistic loading states and delays

Configurable Actions: Extensible automation actions

Error Handling: Graceful error states and user feedback

✅ Completed Features
Core Requirements (All Implemented)
Workflow Canvas (React Flow)

✅ 5 custom node types: Start, Task, Approval, Automated, End

✅ Drag-and-drop from sidebar

✅ Node connections with handles

✅ Canvas controls (zoom, pan, minimap)

✅ Delete nodes/edges with keyboard

Node Configuration Forms

✅ Start Node: Title, metadata fields

✅ Task Node: Title, description, assignee, due date, priority, custom fields

✅ Approval Node: Title, approver role, auto-approve threshold, comments requirement

✅ Automated Node: Title, action selection, dynamic parameters

✅ End Node: Completion message, summary generation, notifications

Mock API Layer

✅ GET /automations - Returns available automated actions

✅ POST /simulate - Simulates workflow execution

✅ Realistic async operations with loading states

Workflow Testing Panel

✅ Workflow validation with error messages

✅ Step-by-step simulation with visual timeline

✅ Execution results summary

✅ Export workflow as JSON

Architecture & Code Quality

✅ Clean, modular folder structure

✅ Reusable custom hooks

✅ Comprehensive TypeScript types

✅ Professional UI matching design specs

✅ Responsive design

✅ Well-documented code

UI/UX Features
✅ Professional header with workflow management

✅ Left sidebar with node palette and metrics dashboard

✅ Right sidebar with node configuration forms

✅ Visual drag feedback and hover effects

✅ Real-time form updates reflected in nodes

✅ Interactive test panel with execution log

✅ Keyboard shortcuts (Delete for removal)
