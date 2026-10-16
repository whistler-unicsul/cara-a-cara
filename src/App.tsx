import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { AudioProvider } from '@/context/AudioContext'
import { GameProvider } from '@/context/GameContext'
import { MultiplayerProvider } from '@/context/MultiplayerContext'
import MenuScreen from '@/screens/MenuScreen'
import AvatarSelection from '@/screens/AvatarSelection'
import PhaseMap from '@/screens/PhaseMap'
import GameScreen from '@/screens/GameScreen'
import MultiplayerLobbyScreen from '@/screens/MultiplayerLobbyScreen'
import MultiplayerWaitingScreen from '@/screens/MultiplayerWaitingScreen'
import MultiplayerGameScreen from '@/screens/MultiplayerGameScreen'

// Um único MultiplayerProvider para as 3 telas: evita perder a sala ao navegar
function MultiplayerLayout() {
  return (
    <MultiplayerProvider>
      <Outlet />
    </MultiplayerProvider>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AudioProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MenuScreen />} />
            <Route path="/avatar" element={<AvatarSelection />} />
            <Route path="/phases" element={<PhaseMap />} />
            <Route path="/game/:phase" element={<GameScreen />} />
            <Route element={<MultiplayerLayout />}>
              <Route path="/multiplayer" element={<MultiplayerLobbyScreen />} />
              <Route path="/multiplayer/waiting" element={<MultiplayerWaitingScreen />} />
              <Route path="/multiplayer/game" element={<MultiplayerGameScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </AudioProvider>
  )
}
