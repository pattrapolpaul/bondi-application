interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-1 bg-[var(--muted)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--bondi-orange)] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
