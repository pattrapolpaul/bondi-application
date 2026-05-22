import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ArrowLeft } from 'lucide-react';

export function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
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
        <h2 className="text-2xl font-bold">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <Button type="submit">
          Create Account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--warm-sand)] px-4 text-sm text-[var(--muted-foreground)]">
            Or connect with
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
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-[var(--bondi-orange)] hover:underline"
        >
          Log in
        </button>
      </p>

      <p className="text-center text-xs text-[var(--muted-foreground)]">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
