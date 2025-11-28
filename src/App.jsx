import './App.css'
import StudentForm from './components/StudentForm'
import StudentSection from './components/StudentSection'
import StudentProvider from './contexts/student' 

function App() {
  return (
    <StudentProvider>
      <StudentForm /> 
      <StudentSection />     
    </StudentProvider>
  )
}

export default App
