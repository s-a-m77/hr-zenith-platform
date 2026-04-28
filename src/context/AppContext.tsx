import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, AuthState, User } from '../types';
import { INITIAL_EMPLOYEES } from '../lib/mock-data';
import { toast } from 'sonner';

interface AppContextType {
  employees: Employee[];
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('staffflow_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('staffflow_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('staffflow_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('staffflow_auth', JSON.stringify(auth));
  }, [auth]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Purely client-side login simulation
    if (email.includes('@company.com')) {
      const mockUser: User = {
        id: 'admin-1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        role: 'Administrator',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      setAuth({ user: mockUser, isAuthenticated: true });
      toast.success('Access Granted', { description: 'Welcome to the local admin console.' });
      return true;
    }
    toast.error('Access Denied', { description: 'Use any @company.com email to login.' });
    return false;
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
    toast.info('Logged Out', { description: 'Local session has been cleared.' });
  };

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Math.random().toString(36).substring(2, 9),
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    toast.success('Employee Added', { description: `${newEmployee.firstName} was saved to local storage.` });
  };

  const updateEmployee = (id: string, employeeData: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...employeeData } : emp))
    );
    toast.success('Record Updated', { description: 'Changes saved locally.' });
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    toast.error('Record Removed', { description: 'Employee has been deleted from local storage.' });
  };

  const resetData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    toast.success('System Reset', { description: 'All data has been restored to defaults.' });
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        auth,
        login,
        logout,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};