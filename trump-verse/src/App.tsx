import AppRouting from './routing/AppRouting'
import { StaffProvider } from './contexts/StaffContext'

function App() {
  return (
    <>
      <StaffProvider>
        <AppRouting/>
      </StaffProvider>
    </>
  )
}

export default App
