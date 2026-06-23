import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { TrackType } from '@/shearedTypes/shearedTypes';

interface CenterblockProps {
  tracks: TrackType[];
  title?: string;
  loading?: boolean;
}

export default function Centerblock({
  tracks,
  title = 'Треки',
  loading = false,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {loading ? (
          <div className={styles.loadingMessage}>Загрузка...</div>
        ) : (
          <Track tracks={tracks} />
        )}
      </div>
    </div>
  );
}
