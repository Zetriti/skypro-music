import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

const mockDispatch = jest.fn();

jest.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock('@/store/features/trackSlice', () => ({
  setSearchString: jest.fn((value) => ({
    type: 'tracks/setSearchString',
    payload: value,
  })),
}));

describe('Search Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('Отрисовывает поле поиска', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Поиск');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
  });

  it('Обновляет значение при вводе', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Поиск') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test search' } });

    expect(input.value).toBe('test search');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Отрисовывает иконку поиска', () => {
    render(<Search />);

    const svg = document.querySelector('.search__svg');
    expect(svg).toBeInTheDocument();
  });

  it('Очищает значение при пустом вводе', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Поиск') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
