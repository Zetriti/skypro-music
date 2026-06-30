import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Track from './Track';
import { data } from '@/data';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { authSliceReducer } from '@/store/features/authSlice';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      tracks: trackSliceReducer,
      auth: authSliceReducer,
    },
    preloadedState: initialState,
  });
};

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

jest.mock('@/hooks/useLikeTraks', () => ({
  useLikeTrack: jest.fn(() => ({
    toggleLike: jest.fn(),
    isLike: false,
    isLoading: false,
  })),
}));

describe('Track Component', () => {
  const store = createTestStore();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Отрисовывает данные трека', () => {
    render(
      <Provider store={store}>
        <Track track={mockTrack} tracks={mockTracks} />
      </Provider>,
    );

    const nameElements = screen.queryAllByText(mockTrack.name);
    expect(nameElements.length).toBe(2); // Название трека и альбом

    expect(screen.getByText(mockTrack.author)).toBeInTheDocument();

    const albumElements = screen.queryAllByText(mockTrack.album);
    expect(albumElements.length).toBeGreaterThan(0);
  });

  test('Отображает правильное форматирование времени', () => {
    render(
      <Provider store={store}>
        <Track track={mockTrack} tracks={mockTracks} />
      </Provider>,
    );

    expect(screen.getByText('3:25')).toBeInTheDocument();
  });

  test('Отображает иконку лайка', () => {
    render(
      <Provider store={store}>
        <Track track={mockTrack} tracks={mockTracks} />
      </Provider>,
    );

    const likeIcon = document.querySelector('.track__timeSvg');
    expect(likeIcon).toBeInTheDocument();
  });

  test('Отображает иконку ноты для неактивного трека', () => {
    render(
      <Provider store={store}>
        <Track track={mockTrack} tracks={mockTracks} />
      </Provider>,
    );

    const svg = document.querySelector('.track__titleSvg');
    expect(svg).toBeInTheDocument();
  });

  test('Обрабатывает клик по треку', () => {
    render(
      <Provider store={store}>
        <Track track={mockTrack} tracks={mockTracks} />
      </Provider>,
    );

    const trackElement = screen.getAllByText(mockTrack.name)[0];
    const trackItem = trackElement.closest('.playlist__item');
    if (trackItem) {
      fireEvent.click(trackItem);
    }

    const state = store.getState();
    expect(state.tracks.currentTrack).toBeDefined();
  });

  test('Отображает активный класс для текущего трека', () => {
    const storeWithTrack = createTestStore({
      tracks: {
        currentTrack: mockTrack,
        isPlay: true,
        playlist: mockTracks,
        shaffledPlaylist: [],
        favoriteTracks: [],
        allTracks: mockTracks,
        fetchError: null,
        fetchIsLoading: false,
        filters: {
          authors: [],
          genres: [],
          years: 'По умолчанию',
          searchString: '',
        },
        PagePlaylist: mockTracks,
        filteredTracks: mockTracks,
      },
    });

    render(
      <Provider store={storeWithTrack}>
        <Track track={mockTrack} tracks={mockTracks} />
      </Provider>,
    );

    const svg = document.querySelector('.track__active');
    expect(svg).toBeInTheDocument();
  });
});
