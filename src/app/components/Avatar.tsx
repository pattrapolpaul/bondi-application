interface AvatarProps {
  initial?: string;
  filled?: boolean;
  size?: number;
  src?: string;
}

export function Avatar({ initial, filled = false, size = 44, src }: AvatarProps) {
  if (filled && initial) {
    return (
      <div
        className="rounded-full bg-[var(--bondi-orange)] flex items-center justify-center text-white"
        style={{ width: size, height: size }}
      >
        <span className="text-sm font-medium">{initial}</span>
      </div>
    );
  }

  if (src) {
    return (
      <div
        className="rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="rounded-full border-2 border-dashed border-[var(--muted-foreground)]"
      style={{ width: size, height: size }}
    />
  );
}
