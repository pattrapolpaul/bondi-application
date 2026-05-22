import { useState } from 'react';
import { Heart, MessageCircle, Share2, Copy, Check, Bookmark } from 'lucide-react';

interface Story {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isYou?: boolean;
}

interface Post {
  id: string;
  user: { name: string; avatar: string; color: string };
  mingleName: string;
  location: string;
  activity: string;
  activityColor: string;
  image: string;
  likes: number;
  caption: string;
  comments: { avatar: string; color: string; name: string; text: string }[];
  timeAgo: string;
  attendees: number;
}

const stories: Story[] = [
  { id: 'you', name: 'Your Story', avatar: 'AJ', color: '#FF6B35', isYou: true },
  { id: '1', name: 'Sarah', avatar: 'SC', color: '#00D9A3' },
  { id: '2', name: 'Mike J.', avatar: 'MJ', color: '#9333EA' },
  { id: '3', name: 'Emma', avatar: 'ED', color: '#4285F4' },
  { id: '4', name: 'Alex K.', avatar: 'AK', color: '#FF69B4' },
  { id: '5', name: 'Tom', avatar: 'TK', color: '#F59E0B' },
];

const POSTS: Post[] = [
  {
    id: '1',
    user: { name: 'Sarah & Crew', avatar: 'SC', color: '#FF6B35' },
    mingleName: 'Beach Volleyball Sunday',
    location: 'Pattaya Beach',
    activity: 'Sport',
    activityColor: '#00D9A3',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=420&fit=crop&auto=format',
    likes: 47,
    caption: 'Best Sunday ever! Waves were insane and we stayed till sunset 🌅 Already planning round 2 — who\'s in?',
    comments: [
      { avatar: 'MJ', color: '#9333EA', name: 'Mike', text: 'This looks incredible 🔥 Where exactly?' },
      { avatar: 'ED', color: '#4285F4', name: 'Emma', text: 'Copying this mingle right now!' },
    ],
    timeAgo: '2h ago',
    attendees: 6,
  },
  {
    id: '2',
    user: { name: 'Tom K.', avatar: 'TK', color: '#9333EA' },
    mingleName: 'Rooftop Dinner Club',
    location: 'Vertigo Bar, Bangkok',
    activity: 'Eat',
    activityColor: '#FF6B35',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=420&fit=crop&auto=format',
    likes: 83,
    caption: 'When the food hits different at 800ft 🍽️✨ The view of Bangkok at night is something else. Absolutely unforgettable evening.',
    comments: [
      { avatar: 'SC', color: '#00D9A3', name: 'Sarah', text: 'Ok I need this reservation 😍' },
    ],
    timeAgo: '5h ago',
    attendees: 4,
  },
  {
    id: '3',
    user: { name: 'Emma & Friends', avatar: 'ED', color: '#4285F4' },
    mingleName: 'Sunrise Hike & Brunch',
    location: 'Doi Suthep, Chiang Mai',
    activity: 'Wellness',
    activityColor: '#00D9A3',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=420&fit=crop&auto=format',
    likes: 129,
    caption: '4am wake-up but SO worth it 😤⛰️ Nothing beats watching the sun rise over the mountains with your crew. Reset complete.',
    comments: [
      { avatar: 'TK', color: '#F59E0B', name: 'Tom', text: 'My calves still hurt but 10/10 would do again 😂' },
      { avatar: 'AK', color: '#FF69B4', name: 'Alex K.', text: 'This is giving main character energy' },
    ],
    timeAgo: '1d ago',
    attendees: 5,
  },
  {
    id: '4',
    user: { name: 'Mike J.', avatar: 'MJ', color: '#00D9A3' },
    mingleName: 'Board Game Night',
    location: 'Funky Town, Ekkamai',
    activity: 'Chill',
    activityColor: '#9333EA',
    image: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=600&h=420&fit=crop&auto=format',
    likes: 34,
    caption: 'We discovered we\'re all terrible at Codenames 😂 But the nachos were elite. Weekly ritual incoming?',
    comments: [
      { avatar: 'SC', color: '#FF6B35', name: 'Sarah', text: 'I was robbed in that last round 🫠' },
    ],
    timeAgo: '2d ago',
    attendees: 7,
  },
];

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-3xl overflow-hidden border border-white/80 shadow-lg shadow-black/5"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
    >
      {/* Post header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-sm"
            style={{ backgroundColor: post.user.color }}
          >
            {post.user.avatar}
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">{post.user.name}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{post.location} · {post.timeAgo}</p>
          </div>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: `${post.activityColor}18`, color: post.activityColor }}
        >
          {post.activity}
        </span>
      </div>

      {/* Mingle name */}
      <div className="px-4 pb-2">
        <p className="font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-display)' }}>
          {post.mingleName}
        </p>
        <p className="text-xs text-[var(--muted-foreground)]">{post.attendees} people attended</p>
      </div>

      {/* Photo */}
      <div className="relative w-full bg-[var(--muted)]" style={{ height: 260 }}>
        <img
          src={post.image}
          alt={post.mingleName}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 50%)' }}
        />
      </div>

      {/* Action bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="flex items-center gap-1.5 transition-transform active:scale-90">
            <Heart
              size={22}
              style={{
                fill: liked ? '#FF4458' : 'transparent',
                color: liked ? '#FF4458' : 'currentColor',
              }}
              className="transition-all duration-150"
            />
            <span className="text-sm font-semibold">{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(v => !v)}
            className="flex items-center gap-1.5 text-[var(--muted-foreground)] transition-transform active:scale-90"
          >
            <MessageCircle size={22} />
            <span className="text-sm font-semibold">{post.comments.length}</span>
          </button>

          <button className="text-[var(--muted-foreground)] transition-transform active:scale-90">
            <Share2 size={22} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Copy mingle idea */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95"
            style={{
              background: copied ? 'rgba(0,217,163,0.12)' : 'rgba(255,107,53,0.1)',
              color: copied ? '#00D9A3' : '#FF6B35',
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy Mingle'}
          </button>

          <button
            onClick={() => setSaved(v => !v)}
            className="transition-transform active:scale-90"
          >
            <Bookmark
              size={22}
              style={{
                fill: saved ? '#FF6B35' : 'transparent',
                color: saved ? '#FF6B35' : 'currentColor',
              }}
            />
          </button>
        </div>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed">{post.caption}</p>
      </div>

      {/* Comments */}
      {showComments && post.comments.length > 0 && (
        <div className="px-4 pb-4 space-y-2.5 border-t border-[var(--border)] pt-3">
          {post.comments.map((comment, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: comment.color }}
              >
                {comment.avatar}
              </div>
              <div
                className="flex-1 px-3 py-2 rounded-2xl text-sm"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                <span className="font-bold mr-1">{comment.name}</span>
                {comment.text}
              </div>
            </div>
          ))}

          {/* Comment input */}
          <div className="flex items-center gap-2.5 mt-1">
            <div
              className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)' }}
            >
              AJ
            </div>
            <div
              className="flex-1 px-3 py-2 rounded-2xl text-sm text-[var(--muted-foreground)]"
              style={{ background: 'rgba(0,0,0,0.04)' }}
            >
              Add a comment…
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HomeFeed() {
  return (
    <div className="pt-2 pb-4 space-y-5">
      {/* Stories */}
      <div className="-mx-5 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-3 pb-1">
          {stories.map((story) => (
            <button key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 group">
              <div
                className="w-14 h-14 rounded-full p-[2px] transition-transform group-active:scale-95"
                style={{
                  background: story.isYou
                    ? 'rgba(0,0,0,0.08)'
                    : 'linear-gradient(135deg, #FF6B35 0%, #FF69B4 50%, #9333EA 100%)',
                }}
              >
                <div
                  className="w-full h-full rounded-full border-2 border-white text-white text-sm font-bold flex items-center justify-center"
                  style={{ backgroundColor: story.color }}
                >
                  {story.isYou ? (
                    <span className="text-xl leading-none" style={{ color: story.color }}>+</span>
                  ) : (
                    story.avatar
                  )}
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[var(--muted-foreground)] max-w-[56px] truncate">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed posts */}
      <div className="space-y-5">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
