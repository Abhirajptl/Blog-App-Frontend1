import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Blogs from './components/Blogs'
import CreateBlogForm from './components/CreateBlogForm'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/create-blog' element={
          <PrivateRoute>
            <CreateBlogForm />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
