import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Database, 
  Trash2, 
  ShieldAlert, 
  HardDrive,
  User,
  Bell,
  Monitor
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
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

const Settings: React.FC = () => {
  const { auth, resetData } = useAppContext();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500 text-sm">Manage your local environment and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <User size={18} className="text-primary" />
              Account Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src={auth.user?.avatar} alt="Avatar" className="h-12 w-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <div className="text-sm font-bold">{auth.user?.name}</div>
                  <div className="text-xs text-slate-500">{auth.user?.email}</div>
                </div>
              </div>
              <Badge className="w-full justify-center py-1">{auth.user?.role}</Badge>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <Button variant="secondary" className="justify-start gap-2 bg-white border-slate-200">
              <Monitor size={16} /> Display
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Bell size={16} /> Notifications
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Database size={16} /> Data & Privacy
            </Button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Data Management</CardTitle>
              <CardDescription>
                This application operates entirely in your browser using LocalStorage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <HardDrive className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Storage Provider</div>
                    <div className="text-xs text-slate-500">Browser LocalStorage</div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ShieldAlert className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Cloud Sync</div>
                    <div className="text-xs text-slate-500">Disabled (Frontend Only)</div>
                  </div>
                </div>
                <Badge variant="secondary">Offline Only</Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2">
                  Danger Zone
                </h4>
                <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Reset All Records</div>
                    <p className="text-xs text-slate-500 mt-1">
                      This will delete all current employees and restore the system to its initial state.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="gap-2">
                        <Trash2 size={16} /> Reset System
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will wipe all your custom employee records from your browser's local storage and replace them with the default mock data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={resetData}
                          className="bg-rose-600 hover:bg-rose-700 text-white"
                        >
                          Confirm Reset
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <div className="flex flex-col">
                  <dt className="text-xs text-slate-400 font-medium">Software Version</dt>
                  <dd className="text-sm font-bold text-slate-900">v1.0.0-frontend</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-slate-400 font-medium">Build Type</dt>
                  <dd className="text-sm font-bold text-slate-900">Client-Side Only</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-slate-400 font-medium">Environment</dt>
                  <dd className="text-sm font-bold text-slate-900 uppercase">Production Preview</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-slate-400 font-medium">DB Integration</dt>
                  <dd className="text-sm font-bold text-slate-900">None (Mocked)</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;