import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
