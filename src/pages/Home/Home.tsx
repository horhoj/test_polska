import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getRoutePath } from '../../router';
import { useAppDispatch } from '../../store/hooks';
import { appActions } from '../../store/app';
import styles from './Home.module.scss';

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrap}>
      <div>Home</div>
      <div>
        <Link to={getRoutePath('TestPage', '1')}>goToTest/1</Link>
      </div>
      <div>
        <button
          type={'button'}
          onClick={() => {
            const path = getRoutePath('TestPage', '2');
            dispatch(appActions.redirect(path));
          }}
        >
          goToTest/2
        </button>
      </div>
    </div>
  );
};
