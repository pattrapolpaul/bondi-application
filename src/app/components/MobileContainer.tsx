interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div
      className="h-screen w-full overflow-hidden relative"
      style={{ background: 'linear-gradient(160deg, #FFF6EE 0%, #FFF0E4 40%, #F8F0FF 100%)' }}
    >
      {/* Decorative blobs — fixed so they show through all layouts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute top-1/3 -left-20 w-56 h-56 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #00D9A3 0%, transparent 70%)', filter: 'blur(36px)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #9333EA 0%, transparent 70%)', filter: 'blur(32px)' }}
        />
      </div>

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
