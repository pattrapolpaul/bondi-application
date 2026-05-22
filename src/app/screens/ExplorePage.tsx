import { useState, useMemo } from 'react';
import { Search, MapPin, Star, SlidersHorizontal, X, ChevronRight, Tag } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  type: string;
  activities: string[];
  rating: number;
  reviews: number;
  price: string;
  priceLevel: 1 | 2 | 3;
  location: string;
  distance: string;
  image: string;
  tag?: string;
  tagColor?: string;
}

const VENUES: Venue[] = [
  {
    id: '1',
    name: 'Central Sports Hub',
    type: 'Sport',
    activities: ['Badminton', 'Tennis', 'Basketball'],
    rating: 4.8,
    reviews: 312,
    price: 'From ฿500/hr',
    priceLevel: 2,
    location: 'Asok, Bangkok',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&h=360&fit=crop&auto=format',
    tag: 'Group Deal',
    tagColor: '#FF6B35',
  },
  {
    id: '2',
    name: 'Vertigo Rooftop Bar',
    type: 'Drink',
    activities: ['Happy Hour', 'Group Dinner', 'Events'],
    rating: 4.9,
    reviews: 1847,
    price: 'From ฿350/pp',
    priceLevel: 3,
    location: 'Sathorn, Bangkok',
    distance: '3.4 km',
    image: 'https://images.unsplash.com/photo-1536300099515-6c61b290b654?w=600&h=360&fit=crop&auto=format',
    tag: 'Trending',
    tagColor: '#9333EA',
  },
  {
    id: '3',
    name: 'Asok Wellness Club',
    type: 'Wellness',
    activities: ['Yoga', 'Pilates', 'Meditation'],
    rating: 4.7,
    reviews: 203,
    price: 'From ฿650/session',
    priceLevel: 2,
    location: 'Asok, Bangkok',
    distance: '0.9 km',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=360&fit=crop&auto=format',
  },
  {
    id: '4',
    name: 'The Marriott Bangkok Brunch',
    type: 'Eat',
    activities: ['Sunday Brunch', 'Private Dining', 'Buffet'],
    rating: 4.6,
    reviews: 589,
    price: 'From ฿1,200/pp',
    priceLevel: 3,
    location: 'Sukhumvit, Bangkok',
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=360&fit=crop&auto=format',
    tag: 'Weekend Special',
    tagColor: '#FF6B35',
  },
  {
    id: '5',
    name: 'Funky Town Board Games',
    type: 'Chill',
    activities: ['Board Games', 'Card Games', 'Trivia'],
    rating: 4.5,
    reviews: 178,
    price: 'From ฿150/hr',
    priceLevel: 1,
    location: 'Ekkamai, Bangkok',
    distance: '4.7 km',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&h=360&fit=crop&auto=format',
  },
  {
    id: '6',
    name: 'Tops Café Sport Center',
    type: 'Sport',
    activities: ['Badminton', 'Squash'],
    rating: 4.3,
    reviews: 94,
    price: 'From ฿300/hr',
    priceLevel: 1,
    location: 'On Nut, Bangkok',
    distance: '5.8 km',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=360&fit=crop&auto=format',
  },
];

const ACTIVITY_TYPES = ['All', 'Sport', 'Eat', 'Drink', 'Wellness', 'Chill', 'Learn'];
const SORT_OPTIONS = ['Nearest', 'Top Rated', 'Price: Low', 'Price: High'];

export function ExplorePage() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Top Rated');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = VENUES.filter(v => {
      const matchesQuery = query === '' ||
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.location.toLowerCase().includes(query.toLowerCase());
      const matchesType = selectedType === 'All' || v.type === selectedType;
      return matchesQuery && matchesType;
    });

    if (sortBy === 'Top Rated') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'Nearest') result = [...result].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    if (sortBy === 'Price: Low') result = [...result].sort((a, b) => a.priceLevel - b.priceLevel);
    if (sortBy === 'Price: High') result = [...result].sort((a, b) => b.priceLevel - a.priceLevel);

    return result;
  }, [query, selectedType, sortBy]);

  return (
    <div className="pt-2 pb-4">
      {/* Header */}
      <div className="mb-5">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: '#FF6B35' }}
        >
          Explore
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">Venues, deals, and ideas for your next mingle</p>
      </div>

      {/* Search bar */}
      <div
        className="flex items-center gap-3 px-4 h-12 rounded-2xl mb-4 border border-white/80 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
      >
        <Search size={18} className="text-[var(--muted-foreground)] flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search venues, areas, activities…"
          className="flex-1 bg-transparent text-sm focus:outline-none placeholder-[var(--muted-foreground)]"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-[var(--muted-foreground)] flex-shrink-0">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Activity type chips */}
      <div className="-mx-5 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-3">
        <div className="flex gap-2 pb-1">
          {ACTIVITY_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95"
              style={{
                background: selectedType === type
                  ? 'linear-gradient(135deg, #FF6B35, #FF8C5A)'
                  : 'rgba(255,255,255,0.8)',
                color: selectedType === type ? 'white' : 'var(--muted-foreground)',
                border: selectedType === type ? 'none' : '1px solid rgba(255,255,255,0.8)',
                boxShadow: selectedType === type ? '0 4px 12px rgba(255,107,53,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + filter row */}
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => setShowFilters(v => !v)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-white/80 shadow-sm transition-all"
          style={{
            background: showFilters ? 'rgba(255,107,53,0.1)' : 'rgba(255,255,255,0.8)',
            color: showFilters ? '#FF6B35' : 'var(--muted-foreground)',
          }}
        >
          <SlidersHorizontal size={14} />
          Filter
        </button>

        <div className="flex gap-2 overflow-x-auto flex-1 [&::-webkit-scrollbar]:hidden">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border transition-all"
              style={{
                background: sortBy === opt ? 'rgba(0,217,163,0.12)' : 'rgba(255,255,255,0.7)',
                color: sortBy === opt ? '#00D9A3' : 'var(--muted-foreground)',
                borderColor: sortBy === opt ? 'rgba(0,217,163,0.3)' : 'rgba(255,255,255,0.8)',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[var(--muted-foreground)] font-semibold mb-4 uppercase tracking-wide">
        {filtered.length} place{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Venue list */}
      <div className="space-y-4">
        {filtered.map((venue) => (
          <button
            key={venue.id}
            className="w-full text-left rounded-3xl overflow-hidden border border-white/80 shadow-lg shadow-black/5 transition-all active:scale-[0.98] hover:-translate-y-0.5"
            style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
          >
            {/* Image */}
            <div className="relative w-full bg-[var(--muted)]" style={{ height: 180 }}>
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)' }}
              />
              {venue.tag && (
                <span
                  className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1.5 text-white rounded-full text-xs font-bold shadow-lg"
                  style={{ background: venue.tagColor || '#FF6B35' }}
                >
                  <Tag size={11} />
                  {venue.tag}
                </span>
              )}
              {/* Type badge */}
              <span
                className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
              >
                {venue.type}
              </span>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="font-bold text-base leading-tight pr-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {venue.name}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star size={13} fill="#FBBF24" color="#FBBF24" />
                  <span className="text-sm font-bold">{venue.rating}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">({venue.reviews})</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-2">
                <MapPin size={12} />
                <span>{venue.location}</span>
                <span>·</span>
                <span>{venue.distance}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {venue.activities.map(act => (
                  <span
                    key={act}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--foreground)' }}
                  >
                    {act}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FF6B35]">{venue.price}</span>
                <span
                  className="text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}
                >
                  View & Book
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>No venues found</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
