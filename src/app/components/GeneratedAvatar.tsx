interface GeneratedAvatarProps {
  avatar: string;
  size?: number;
  onClick?: () => void;
}

export function GeneratedAvatar({ avatar, size = 80, onClick }: GeneratedAvatarProps) {
  // Check if it's a preset avatar (JSON string) or uploaded image (data URL)
  const isPresetAvatar = avatar.startsWith('{');
  const isUploadedImage = avatar.startsWith('data:image');

  if (isUploadedImage) {
    return (
      <div
        className="rounded-full overflow-hidden border-4 border-dashed border-[var(--bondi-orange)] cursor-pointer hover:opacity-80 transition-opacity"
        style={{ width: size, height: size }}
        onClick={onClick}
      >
        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  if (isPresetAvatar) {
    try {
      const avatarData = JSON.parse(avatar);
      return (
        <div
          className="rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-4 border-dashed border-[var(--bondi-orange)]"
          style={{
            width: size,
            height: size,
            backgroundColor: avatarData.bg,
          }}
          onClick={onClick}
        >
          <span style={{ fontSize: size * 0.5 }}>{avatarData.icon}</span>
        </div>
      );
    } catch (e) {
      // Fallback if parsing fails
    }
  }

  // Default guest avatar
  return (
    <div
      className="rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border-4 border-dashed border-[var(--bondi-orange)]"
      style={{
        width: size,
        height: size,
        backgroundColor: '#FF6B35',
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: size * 0.5 }}>👤</span>
    </div>
  );
}
