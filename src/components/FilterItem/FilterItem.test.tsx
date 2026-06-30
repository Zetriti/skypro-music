import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilterItem from './FilterItem';
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

describe('FilterItem Component', () => {
  const store = createTestStore();
  const mockProps = {
    title: 'исполнителю',
    onClick: jest.fn(),
    isOpen: false,
    activeFilter: '',
    tracks: data,
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Отрисовывает кнопку с названием', () => {
    render(
      <Provider store={store}>
        <FilterItem {...mockProps} />
      </Provider>,
    );

    expect(screen.getByText('исполнителю')).toBeInTheDocument();
  });

  it('Открывает дропдаун при клике', () => {
    render(
      <Provider store={store}>
        <FilterItem {...mockProps} isOpen={true} />
      </Provider>,
    );

    const list = document.querySelector('.filter__list');
    expect(list).toBeInTheDocument();
  });

  it('Показывает список исполнителей', () => {
    render(
      <Provider store={store}>
        <FilterItem {...mockProps} isOpen={true} title="исполнителю" />
      </Provider>,
    );

    expect(screen.getByText('Alexander Nakarada')).toBeInTheDocument();
    expect(screen.getByText('Frank Schroter')).toBeInTheDocument();
    expect(screen.getByText('Kevin Macleod')).toBeInTheDocument();
  });

  it('Показывает список жанров', () => {
    render(
      <Provider store={store}>
        <FilterItem {...mockProps} isOpen={true} title="жанру" />
      </Provider>,
    );

    expect(screen.getByText('Классическая музыка')).toBeInTheDocument();
  });

  it('Показывает варианты сортировки по году', () => {
    render(
      <Provider store={store}>
        <FilterItem {...mockProps} isOpen={true} title="году выпуска" />
      </Provider>,
    );

    expect(screen.getByText('По умолчанию')).toBeInTheDocument();
    expect(screen.getByText('Сначала новые')).toBeInTheDocument();
    expect(screen.getByText('Сначала старые')).toBeInTheDocument();
  });

  it('Вызывает onSelect при клике на элемент списка', () => {
    const onSelect = jest.fn();
    render(
      <Provider store={store}>
        <FilterItem
          {...mockProps}
          isOpen={true}
          onSelect={onSelect}
          title="исполнителю"
        />
      </Provider>,
    );

    const firstItem = screen.getAllByRole('listitem')[0];
    fireEvent.click(firstItem);
    expect(onSelect).toHaveBeenCalled();
  });

  it('Показывает бадж с количеством выбранных фильтров', () => {
    const storeWithFilters = createTestStore({
      tracks: {
        filters: {
          authors: ['Alexander Nakarada', 'Frank Schroter'],
          genres: [],
          years: 'По умолчанию',
          searchString: '',
        },
      },
    });

    render(
      <Provider store={storeWithFilters}>
        <FilterItem {...mockProps} />
      </Provider>,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('Не показывает бадж если фильтры не выбраны', () => {
    render(
      <Provider store={store}>
        <FilterItem {...mockProps} />
      </Provider>,
    );

    const badge = document.querySelector('.filter__badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('Подсвечивает выбранные элементы в списке', () => {
    const storeWithFilters = createTestStore({
      tracks: {
        filters: {
          authors: ['Alexander Nakarada'],
          genres: [],
          years: 'По умолчанию',
          searchString: '',
        },
      },
    });

    render(
      <Provider store={storeWithFilters}>
        <FilterItem {...mockProps} isOpen={true} title="исполнителю" />
      </Provider>,
    );

    const selectedItem = screen.getByText('Alexander Nakarada');
    expect(selectedItem).toHaveClass('filter__item_selected');
  });
});
