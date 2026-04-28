import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Briefcase, Loader2, Mail, Lock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Artificial delay to simulate processing
    await new Promise(r => setTimeout(r, 800));
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/e87f4778-c45e-49ad-a61d-26327f09fe30/hr-dashboard-hero-0161236b-1777366680867.webp')`,
          filter: 'brightness(0.3) saturate(1.2)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-slate-950/80 z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-[420px]"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-white p-4 rounded-[2rem] shadow-2xl flex items-center justify-center mb-4">
            <div className="bg-primary p-3 rounded-2xl text-white">
              <Briefcase size={36} />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-1">StaffFlow</h1>
          <p className="text-white/60 font-medium tracking-wide uppercase text-xs">Pure Frontend Employee Console</p>
        </div>

        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pt-8 pb-4 px-8">
            <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
            <CardDescription>
              Enter any <span className="font-bold text-primary">@company.com</span> email to access the local console.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-semibold ml-1">Company Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@company.com" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-slate-600 font-semibold">Local Password</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-start gap-3 mt-2">
                <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                  This system runs entirely in your browser. All data is stored in LocalStorage and never leaves your device.
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-4">
              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Initializing...
                  </div>
                ) : (
                  'Launch Console'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 flex items-center justify-center gap-6">
          <div className="h-px bg-white/20 flex-1" />
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Client Side Only</p>
          <div className="h-px bg-white/20 flex-1" />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;