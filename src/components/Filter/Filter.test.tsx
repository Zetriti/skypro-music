import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Filter from './Filter';
import { data } from '@/data';
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

describe('Filter Component', () => {
  const store = createTestStore();
  const mockProps = {
    tracks: data,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Отрисовывает все фильтры', () => {
    render(
      <Provider store={store}>
        <Filter {...mockProps} />
      </Provider>,
    );

    expect(screen.getByText('Искать по:')).toBeInTheDocument();
    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
  });

  it('Открывает фильтр при клике', () => {
    render(
      <Provider store={store}>
        <Filter {...mockProps} />
      </Provider>,
    );

    const filterButton = screen.getByText('исполнителю');
    fireEvent.click(filterButton);

    const list = document.querySelector('.filter__list');
    expect(list).toBeInTheDocument();
  });

  it('Закрывает открытый фильтр при повторном клике', () => {
    render(
      <Provider store={store}>
        <Filter {...mockProps} />
      </Provider>,
    );

    const filterButton = screen.getByText('исполнителю');
    fireEvent.click(filterButton);
    fireEvent.click(filterButton);

    const list = document.querySelector('.filter__list');
    expect(list).not.toBeInTheDocument();
  });

  it('Закрывает один фильтр при открытии другого', () => {
    render(
      <Provider store={store}>
        <Filter {...mockProps} />
      </Provider>,
    );

    const authorFilter = screen.getByText('исполнителю');
    const genreFilter = screen.getByText('жанру');

    fireEvent.click(authorFilter);
    expect(document.querySelector('.filter__list')).toBeInTheDocument();

    fireEvent.click(genreFilter);
    expect(document.querySelectorAll('.filter__list').length).toBe(1);
  });

  it('Применяет активный класс к открытому фильтру', () => {
    render(
      <Provider store={store}>
        <Filter {...mockProps} />
      </Provider>,
    );

    const filterButton = screen.getByText('исполнителю');
    fireEvent.click(filterButton);

    expect(filterButton).toHaveClass('active');
  });
});
