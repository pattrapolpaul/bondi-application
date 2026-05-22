import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { useMingle } from '../context/MingleContext';
import { Sparkles, Zap, Heart } from 'lucide-react';

export function CreatorLanding() {
  const navigate = useNavigate();
  const { resetMingle } = useMingle();

  const handleCreateAccount = () => {
    resetMingle();
    navigate('/create-account');
  };

  const features = [
    {
      icon: Zap,
      label: 'Plan Together',
      desc: 'Collaborate with your group to decide what, where, and when',
      gradient: 'from-[#FF6B35]/15 to-[#FF8C5A]/5',
      iconColor: '#FF6B35',
    },
    {
      icon: Heart,
      label: 'Stay Connected',
      desc: 'Real-time updates keep everyone in the loop, no group chat chaos',
      gradient: 'from-[#00D9A3]/15 to-[#00F0B5]/5',
      iconColor: '#00D9A3',
    },
    {
      icon: Sparkles,
      label: 'Track Your Mingles',
      desc: 'Relive past adventures and plan new ones with the same crew',
      gradient: 'from-[#9333EA]/15 to-[#C084FC]/5',
      iconColor: '#9333EA',
    },
  ];

  const socialProof = [
    { avatar: 'AK', color: '#FF6B35' },
    { avatar: 'SC', color: '#00D9A3' },
    { avatar: 'MJ', color: '#9333EA' },
    { avatar: 'ED', color: '#4285F4' },
  ];

  return (
    <div className="pt-6 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF6B35] mb-2"
          style={{ background: 'rgba(255,107,53,0.12)' }}>
          <Sparkles size={12} />
          Stop texting, start meeting
        </div>

        <h1
          className="text-6xl font-bold leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: '#FF6B35' }}
        >
          Bondi
        </h1>

        <h2
          className="text-3xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Plan Your<br />
          <span className="italic" style={{ color: '#FF6B35' }}>Mingle</span>
        </h2>

        <p className="text-base text-[var(--muted-foreground)] max-w-xs mx-auto leading-relaxed">
          Stop planning in group chats.<br />Start <em>actually</em> meeting.
        </p>

        {/* Social proof row */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex -space-x-2">
            {socialProof.map((p) => (
              <div
                key={p.avatar}
                className="w-8 h-8 rounded-full border-2 border-white text-white text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: p.color }}
              >
                {p.avatar}
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            <span className="font-semibold text-[var(--foreground)]">2,400+ friends</span> met this week
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-3">
        {features.map(({ icon: Icon, label, desc, gradient, iconColor }, i) => (
          <div
            key={label}
            className={`bg-gradient-to-r ${gradient} rounded-2xl p-4 flex items-start gap-4 border border-white/60 shadow-sm animate-slide-up`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ backgroundColor: `${iconColor}20` }}
            >
              <Icon size={22} style={{ color: iconColor }} />
            </div>
            <div>
              <h3 className="font-bold mb-0.5 text-[var(--foreground)]">{label}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full space-y-3">
        <Button onClick={handleCreateAccount}>
          Get Started — It's Free
        </Button>
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[var(--bondi-orange)] hover:underline font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
