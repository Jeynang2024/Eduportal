import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { Outlet } from 'react-router-dom';

const EducatorLayout = () => (
  <>
    <Navbar userType="educator" />
    <main>
        <Outlet />
    </main>
    <Footer userType="educator" />
  </>
);

export default EducatorLayout;
