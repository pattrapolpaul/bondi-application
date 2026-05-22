import { useState } from 'react';
import { X, Upload, Camera } from 'lucide-react';
import { Button } from './Button';

interface AvatarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
  currentAvatar: string;
}

const presetAvatars = [
  { id: 'avatar1', bg: '#FF6B35', icon: '🏄' },
  { id: 'avatar2', bg: '#00D9A3', icon: '🎮' },
  { id: 'avatar3', bg: '#FFB800', icon: '🎸' },
  { id: 'avatar4', bg: '#FF006E', icon: '🎨' },
  { id: 'avatar5', bg: '#8338EC', icon: '⚡' },
  { id: 'avatar6', bg: '#3A86FF', icon: '🚀' },
  { id: 'avatar7', bg: '#FB5607', icon: '🎭' },
  { id: 'avatar8', bg: '#06FFA5', icon: '🎯' },
  { id: 'avatar9', bg: '#FF006E', icon: '🌟' },
  { id: 'avatar10', bg: '#4CC9F0', icon: '🎪' },
  { id: 'avatar11', bg: '#F72585', icon: '🎵' },
  { id: 'avatar12', bg: '#7209B7', icon: '🎬' },
];

export function AvatarPicker({ isOpen, onClose, onSelectAvatar, currentAvatar }: AvatarPickerProps) {
  const [selectedPreview, setSelectedPreview] = useState(currentAvatar);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedPreview(result);
        onSelectAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (avatar: typeof presetAvatars[0]) => {
    const avatarData = JSON.stringify(avatar);
    setSelectedPreview(avatarData);
    onSelectAvatar(avatarData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[375px] bg-white rounded-t-3xl p-6 space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Choose Avatar</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {presetAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleSelectPreset(avatar)}
                className="aspect-square rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform"
                style={{ backgroundColor: avatar.bg }}
              >
                {avatar.icon}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-full bg-[var(--muted)] rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer hover:bg-[var(--muted)]/80 transition-colors">
                <Upload size={20} />
                <span className="font-medium">Upload Photo</span>
              </div>
            </label>

            <label className="block">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-full bg-[var(--muted)] rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer hover:bg-[var(--muted)]/80 transition-colors">
                <Camera size={20} />
                <span className="font-medium">Take Photo</span>
              </div>
            </label>
          </div>
        </div>

        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}
