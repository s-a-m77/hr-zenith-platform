import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  Briefcase, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, description, trend, trendValue, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg text-primary">
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="flex items-center mt-1">
          {trend === 'up' ? (
            <span className="flex items-center text-xs font-medium text-emerald-600">
              <ArrowUpRight size={14} className="mr-1" /> {trendValue}
            </span>
          ) : (
            <span className="flex items-center text-xs font-medium text-rose-600">
              <ArrowDownRight size={14} className="mr-1" /> {trendValue}
            </span>
          )}
          <span className="ml-2 text-xs text-slate-400">{description}</span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const { employees } = useAppContext();
  
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const departments = [...new Set(employees.map(e => e.department))].length;

  const stats = [
    { 
      title: 'Total Employees', 
      value: totalEmployees, 
      icon: Users, 
      description: 'vs last month', 
      trend: 'up', 
      trendValue: '12%',
      delay: 0.1
    },
    { 
      title: 'Active Staff', 
      value: activeEmployees, 
      icon: UserCheck, 
      description: 'current session', 
      trend: 'up', 
      trendValue: '4%',
      delay: 0.2
    },
    { 
      title: 'On Leave', 
      value: onLeave, 
      icon: UserMinus, 
      description: 'pending return', 
      trend: 'down', 
      trendValue: '2%',
      delay: 0.3
    },
    { 
      title: 'Operational Units', 
      value: departments, 
      icon: Briefcase, 
      description: 'departments', 
      trend: 'up', 
      trendValue: '0%',
      delay: 0.4
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500 text-sm">Real-time stats from your local browser storage.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 py-1 px-3">
            <ShieldCheck size={14} /> Local Session Active
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1.5 py-1 px-3">
            <Database size={14} /> 0ms Latency
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-none shadow-sm h-full overflow-hidden">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Recent Activity</span>
                <span className="text-xs font-normal text-slate-400">Showing latest updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {employees.slice(0, 5).map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{employee.firstName} {employee.lastName}</div>
                        <div className="text-xs text-slate-500">{employee.position} &bull; {employee.department}</div>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-medium text-slate-900">${employee.salary.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{employee.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-none shadow-xl h-full bg-slate-900 text-white relative overflow-hidden group">
            <div 
              className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-700" 
              style={{ 
                backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/e87f4778-c45e-49ad-a61d-26327f09fe30/dashboard-pattern-v2-1964d392-1777366681014.webp')`,
                backgroundSize: 'cover'
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent z-0" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-400" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4 relative z-10">
              <div className="text-7xl font-black mb-2 tracking-tighter">100%</div>
              <p className="text-white/70 text-center text-sm px-4">
                No database overhead. Ultra-fast local state management is active.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="text-xs text-white/60 mb-1">State Size</div>
                  <div className="text-lg font-bold">~1.2MB</div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Sync Latency</div>
                  <div className="text-lg font-bold">0ms</div>
                </div>
              </div>

              <button className="mt-8 w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all hover:shadow-lg active:scale-95">
                Optimize Cache
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;