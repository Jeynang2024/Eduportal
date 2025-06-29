import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar userType="student" />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer userType="student" />
  </div>
);

export default StudentLayout;
