# Frontend-Only Employee Management System Plan

**Objective:** Develop a production-ready, frontend-only employee management system with CRUD operations, mock authentication, and a professional admin dashboard.

**Phase 1: Architecture & State Management**
1.  **Mock Data Strategy:** Initialize a set of mock employees with realistic data (names, emails, positions, departments, etc.).
2.  **State Management:** Use React Context (or a simple custom hook with local storage) to persist employee data and auth state across sessions.
3.  **Routing:** Implement `react-router-dom` for navigation:
    *   `/login`: Login page.
    *   `/dashboard`: Admin dashboard summary.
    *   `/employees`: Employee list view.
    *   `/employees/new`: Create employee form.
    *   `/employees/edit/:id`: Edit employee form.
    *   `/settings`: Simple settings/profile page.

**Phase 2: UI/UX Design (Minimalism Style)**
1.  **Color Palette:** SaaS (General) - Blue Primary (#2563EB), Slate backgrounds (#F8FAFC), and high-contrast text.
2.  **Typography:** Inter font family for a modern, clean look.
3.  **Component Library:** Use existing shadcn/ui components (Button, Input, Table, Dialog, Form, Card, Sonner).
4.  **Icons:** Lucide-react for all interface icons.
5.  **Animations:** Framer-motion for smooth transitions between pages and modal overlays.

**Phase 3: Core Feature Implementation**
1.  **Authentication UI:**
    *   Build a sleek login page with validation.
    *   Implement "Login" which stores a mock user in state.
    *   Protected route wrapper to redirect unauthenticated users.
2.  **Dashboard Page:**
    *   Display statistic cards (Total Employees, Depts, Recent Hires).
    *   Chart showing employee distribution by department (using shadcn charts if available).
3.  **Employee Management:**
    *   **EmployeeList**: Table with search (name/email) and filtering (department).
    *   **EmployeeForm**: Comprehensive form with validation (Zod + React Hook Form).
    *   **CRUD Actions**: Implementation of Add, Edit, and Delete functions in state.
4.  **Notifications:** Use `sonner` for success/error feedback on all CRUD operations.

**Phase 4: Refinement & Validation**
1.  **Responsive Design:** Ensure the sidebar collapses on mobile and tables are scrollable or card-based.
2.  **Accessibility:** Add ARIA labels, ensure focus rings are visible, and semantic HTML is used.
3.  **Final Build:** Run `validate_build` to ensure no TypeScript or linting errors.

**Agent Assignments:**
*   **Frontend Engineer:** Entire scope (Phases 1-4).
