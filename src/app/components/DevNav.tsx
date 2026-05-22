import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export function DevNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      title: 'Start',
      routes: [
        { path: '/', label: 'Landing' },
        { path: '/user-dashboard', label: 'User Dashboard' },
      ],
    },
    {
      title: 'Phase 1: Lead (Orange)',
      routes: [
        { path: '/create-mingle', label: 'Create Mingle' },
        { path: '/invite-friends', label: 'Invite Friends' },
      ],
    },
    {
      title: 'Phase 2: Planning (Green)',
      routes: [
        { path: '/planning-what', label: 'The What' },
        { path: '/planning-where', label: 'The Where' },
        { path: '/planning-when', label: 'The When' },
        { path: '/mingle-summary', label: 'Mingle Summary' },
        { path: '/check-in', label: 'Check In' },
      ],
    },
    {
      title: 'Phase 3: Confirmation (Blue)',
      routes: [
        { path: '/confirm-irl', label: 'Confirm IRL' },
      ],
    },
    {
      title: 'Phase 4: Post (Purple)',
      routes: [
        { path: '/closing-party', label: 'Closing Party' },
        { path: '/rate-share', label: 'Rate & Share' },
        { path: '/content-share', label: 'Content Share' },
      ],
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-[var(--bondi-orange)] text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Navigation</h2>

              {sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.routes.map((route) => (
                      <button
                        key={route.path}
                        onClick={() => {
                          navigate(route.path);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          location.pathname === route.path
                            ? 'bg-[var(--bondi-orange)] text-white'
                            : 'hover:bg-[var(--muted)]'
                        }`}
                      >
                        {route.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
