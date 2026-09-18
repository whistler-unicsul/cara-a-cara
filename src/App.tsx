import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
            <Route path="/multiplayer" element={<MultiplayerProvider><MultiplayerLobbyScreen /></MultiplayerProvider>} />
            <Route path="/multiplayer/waiting" element={<MultiplayerProvider><MultiplayerWaitingScreen /></MultiplayerProvider>} />
            <Route path="/multiplayer/game" element={<MultiplayerProvider><MultiplayerGameScreen /></MultiplayerProvider>} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </AudioProvider>
  )
}
