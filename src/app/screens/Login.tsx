import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ArrowLeft } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  const thirdPartyProviders = [
    { name: 'Line', color: 'bg-[#00B900]', icon: '💬' },
    { name: 'Google', color: 'bg-[#4285F4]', icon: '🌐' },
    { name: 'Facebook', color: 'bg-[#1877F2]', icon: '📘' },
    { name: 'Discord', color: 'bg-[#5865F2]', icon: '🎮' },
  ];

  return (
    <div className="pt-8 space-y-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Log In</h2>
      </div>

      <div className="text-center">
        <p className="text-[var(--muted-foreground)]">
          Welcome back! Sign in to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Email or Username"
            placeholder="Enter your email or username"
            value={formData.emailOrUsername}
            onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button
          type="button"
          className="text-sm text-[var(--bondi-orange)] hover:underline"
          onClick={() => {
            // Handle forgot password
            console.log('Forgot password clicked');
          }}
        >
          Forgot password?
        </button>

        <Button type="submit">
          Log In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--warm-sand)] px-4 text-sm text-[var(--muted-foreground)]">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {thirdPartyProviders.map((provider) => (
          <button
            key={provider.name}
            type="button"
            className={`${provider.color} text-white rounded-lg p-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
            onClick={() => { navigate('/home'); }}
          >
            <span className="text-xl">{provider.icon}</span>
            <span className="font-medium text-sm">{provider.name}</span>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-[var(--muted-foreground)]">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/create-account')}
          className="text-[var(--bondi-orange)] hover:underline"
        >
          Create account
        </button>
      </p>
    </div>
  );
}
