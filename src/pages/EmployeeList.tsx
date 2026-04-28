import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  Plus,
  UserPlus
} from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeList: React.FC = () => {
  const { employees, deleteEmployee } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredEmployees = employees.filter(emp => 
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100';
      case 'On Leave': return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
      case 'Terminated': return 'bg-rose-100 text-rose-700 hover:bg-rose-100';
      default: return 'bg-slate-100 text-slate-700 hover:bg-slate-100';
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteEmployee(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            placeholder="Search employees..." 
            className="pl-10 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
          <Button onClick={() => navigate('/employees/new')} className="gap-2">
            <Plus size={16} />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Position / Department</TableHead>
                  <TableHead className="font-semibold">Hire Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Salary</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredEmployees.map((emp) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={emp.id}
                      className="group hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <TableCell onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                            {emp.firstName[0]}{emp.lastName[0]}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">{emp.firstName} {emp.lastName}</span>
                            <span className="text-xs text-slate-500">{emp.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-900 font-medium">{emp.position}</span>
                          <span className="text-xs text-slate-500">{emp.department}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600" onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                        {new Date(emp.hireDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                        <Badge className={getStatusColor(emp.status)} variant="secondary">
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900" onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                        ${emp.salary.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/employees/edit/${emp.id}`)}>
                              <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                              onClick={() => setDeleteId(emp.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
              <UserPlus size={40} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No employees found</h3>
            <p className="text-slate-500 max-w-xs mt-1">
              Try adjusting your search or filters, or add a new employee record.
            </p>
            <Button 
              onClick={() => navigate('/employees/new')} 
              className="mt-6"
              variant="outline"
            >
              Add Your First Employee
            </Button>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee record
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeList;