import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header  from '../../components/Header/Header';
import styles from './HomePage.module.css';

// HomePage'i bilerek "dumb" bıraktım: tek görevi sabit layout'u (Sidebar+Header) çizmek,
// board içeriğiyle ilgili mantığın hepsi <Outlet/> üzerinden gelen ScreensPage'de
export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
