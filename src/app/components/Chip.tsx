interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
        selected
          ? 'bg-[var(--bondi-orange)] text-white'
          : 'bg-white border border-[var(--border)] text-[var(--foreground)]'
      }`}
    >
      {label}
    </button>
  );
}
