import { MemoryRouter, Routes, Route, Navigate } from 'react-router';
import { MobileContainer } from './components/MobileContainer';
import { DevNav } from './components/DevNav';
import { MingleProvider } from './context/MingleContext';

// Layouts
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { FlowLayout } from './layouts/FlowLayout';

// Auth screens
import { CreatorLanding } from './screens/CreatorLanding';
import { CreateAccount } from './screens/CreateAccount';
import { Login } from './screens/Login';

// Main app screens (with nav)
import { HomeFeed } from './screens/HomeFeed';
import { UserDashboard } from './screens/UserDashboard';
import { ExplorePage } from './screens/ExplorePage';
import { ChatLobby } from './screens/ChatLobby';

// Mingle creation & planning flow
import { CreateMingle } from './screens/CreateMingle';
import { InviteFriends } from './screens/InviteFriends';
import { PlanningTheWhat } from './screens/PlanningTheWhat';
import { PlanningTheWhere } from './screens/PlanningTheWhere';
import { PlanningTheWhen } from './screens/PlanningTheWhen';
import { MingleSummary } from './screens/MingleSummary';
import { CheckIn } from './screens/CheckIn';
import { ConfirmIRL } from './screens/ConfirmIRL';
import { ClosingParty } from './screens/ClosingParty';
import { RateShare } from './screens/RateShare';
import { ContentShare } from './screens/ContentShare';

export default function App() {
  return (
    <MingleProvider>
      <MemoryRouter>
        <DevNav />
        <MobileContainer>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/" element={<CreatorLanding />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Main app routes — with TopNav + BottomNav */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomeFeed />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/chat" element={<ChatLobby />} />
            </Route>

            {/* Mingle creation & event flow — focused, no bottom nav */}
            <Route element={<FlowLayout />}>
              <Route path="/create-mingle" element={<CreateMingle />} />
              <Route path="/invite-friends" element={<InviteFriends />} />
              <Route path="/planning-what" element={<PlanningTheWhat />} />
              <Route path="/planning-where" element={<PlanningTheWhere />} />
              <Route path="/planning-when" element={<PlanningTheWhen />} />
              <Route path="/mingle-summary" element={<MingleSummary />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/confirm-irl" element={<ConfirmIRL />} />
              <Route path="/closing-party" element={<ClosingParty />} />
              <Route path="/rate-share" element={<RateShare />} />
              <Route path="/content-share" element={<ContentShare />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MobileContainer>
      </MemoryRouter>
    </MingleProvider>
  );
}
