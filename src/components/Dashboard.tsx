import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserMinus, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats } from '@/types';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats: DashboardStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      trend: '+4% from last month',
      trendIcon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Active Now',
      value: stats.activeEmployees,
      icon: UserCheck,
      trend: '+12 new hires',
      trendIcon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'On Leave',
      value: stats.onLeave,
      icon: UserMinus,
      trend: '-2% from last week',
      trendIcon: TrendingDown,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      title: 'Departments',
      value: stats.departments,
      icon: Building2,
      trend: 'No change',
      trendIcon: null,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`${card.bg} ${card.color} p-2 rounded-md`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground">
                  {card.trendIcon && <card.trendIcon className="mr-1 h-3 w-3" />}
                  {card.trend}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Hiring Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-end justify-between gap-2 pt-6">
            {[40, 60, 45, 80, 55, 90, 75, 65, 85, 45, 60, 70].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="w-full bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-pointer"
                />
                <span className="text-[10px] text-muted-foreground uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { name: 'John Doe', action: 'added to Engineering', time: '2h ago' },
                { name: 'Sarah Wilson', action: 'updated profile', time: '5h ago' },
                { name: 'Michael Brown', action: 'requested leave', time: 'Yesterday' },
                { name: 'David Lee', action: 'joined Analytics', time: '2 days ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center font-bold text-sm">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;