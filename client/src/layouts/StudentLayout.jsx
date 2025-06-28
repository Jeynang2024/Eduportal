import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => (
  <>
    <Navbar userType="student" />
    <main>
        <Outlet />
    </main>
    <Footer userType="student" />
  </>
);

export default StudentLayout;
