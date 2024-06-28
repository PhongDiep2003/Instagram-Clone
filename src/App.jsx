import {Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import PageLayout from './Layouts/PageLayout'
import ProfilePage from './pages/ProfilePage'
import userAuthStore from './storage/useStorage'
import ChatPage from './pages/ChatPage'
function App() {
  const authUser = userAuthStore(state => state.user)
  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={'/auth'}/>}/>
        <Route path='/auth' element={!authUser ? <AuthPage/> : <Navigate to={'/'}/>}/>
        <Route path='/:username' element={authUser ? <ProfilePage/> : <Navigate to={'/auth'}/>}/>
        <Route path='/chat' element={authUser ? <ChatPage/> : <Navigate to={'/auth'}/>}/>
      </Routes>
    </PageLayout>
  )
}

export default App
