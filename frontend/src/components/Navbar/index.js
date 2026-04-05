import styles from './Navbar.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import classNames from 'classnames';
import {
  RiShoppingCart2Line,
  RiShoppingCartFill, 
  RiLogoutBoxLine
} from 'react-icons/ri';
import Busca from '../Busca';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'AuthContext';

const iconeProps = {
  color: 'white',
  size: 24
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Send them back to Login page
  };

  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} onClick={() => navigate('/')} />
      <div className={styles.links}>
        <div>
          <Link to='/' className={classNames(styles.link, {
            [styles.selected]: location.pathname === '/'
          })}>
            Página inicial
          </Link>
        </div>
      </div>
      <div className={styles.busca}>
        <Busca />
      </div>
      <div className={styles.icones}>
        <Link to="/home/carrinho">
          {location.pathname === '/home/carrinho'
            ? <RiShoppingCartFill {...iconeProps} />
            : <RiShoppingCart2Line {...iconeProps} />
          }
        </Link>

        <div 
          onClick={handleLogout} 
          style={{ cursor: 'pointer', marginLeft: '20px' }}
          title="Sair"
        >
          <RiLogoutBoxLine {...iconeProps} />
        </div>
      </div>
    </nav>
  )
}