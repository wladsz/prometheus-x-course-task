import { Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignIn from '../components/SignIn';

export default function Layout() {
  const {user} = useUser();
  
  return (
    <>
        <Header/>
          <main className="mx-5">
            {user === null ? <SignIn /> : <Outlet />}
          </main>
        <Footer/>
    </>
  );
}