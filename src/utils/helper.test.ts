import { data } from '@/data';
import {
  formatTime,
  getTimePanel,
  getUniqueValuesByKey,
  searchTracks,
} from './helper';

describe('formatTime', () => {
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
  it('Форматирует время меньше 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });
  it('Добавление 0 если секунд меньше 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Обрабатывает 1 минуту', () => {
    expect(formatTime(60)).toBe('1:00');
  });
  it('Обрабатывает время от 1 до 2 минут', () => {
    expect(formatTime(119)).toBe('1:59');
  });
  it('Обрабатывает 2 минуты', () => {
    expect(formatTime(120)).toBe('2:00');
  });
  it('Обрабатывает 59 минут 59 секунд', () => {
    expect(formatTime(3599)).toBe('59:59');
  });
  it('Обрабатывает 60 минут', () => {
    expect(formatTime(3600)).toBe('60:00');
  });
  it('Обрабатывает отрицательные значения', () => {
    expect(formatTime(-3)).toBe('0:00');
  });
  it('Обрабатывает большие значения', () => {
    expect(formatTime(6321)).toBe('105:21');
  });
});

describe('getTimePanel', () => {
  it('Обрабатывает нулевое время трека', () => {
    expect(getTimePanel(0, 0)).toBe('0:00 / 0:00');
  });
  it('Обрабатывает нулевое текущее время трека', () => {
    expect(getTimePanel(0, 65)).toBe('0:00 / 1:05');
  });
  it('Обрабатывает окончание трека', () => {
    expect(getTimePanel(65, 65)).toBe('1:05 / 1:05');
  });
  it('Обрабатывает текущее время трека', () => {
    expect(getTimePanel(65, 85)).toBe('1:05 / 1:25');
  });
  it('Обрабатывает общее время трека "undefined"', () => {
    expect(getTimePanel(65, undefined)).toBeUndefined();
  });
  it('Обрабатывает большие значения', () => {
    expect(getTimePanel(4236, 5632)).toBe('70:36 / 93:52');
  });
});

describe('getUniqueValuesByKey', () => {
  it('Возвращает массив уникальных авторов', () => {
    expect(getUniqueValuesByKey(data, 'author')).toStrictEqual([
      'Alexander Nakarada',
      'Frank Schroter',
      'Kevin Macleod',
      'Mixkit',
      '-',
      'Waltz Piano',
      'Winniethemoog',
    ]);
  });

  it('Возвращает массив уникальных жанров', () => {
    expect(getUniqueValuesByKey(data, 'genre')).toStrictEqual([
      'Классическая музыка',
    ]);
  });

  it('Возвращает пустой массив если передан null', () => {
    expect(getUniqueValuesByKey(null, 'author')).toStrictEqual([]);
  });

  it('Возвращает пустой массив если передан undefined', () => {
    expect(getUniqueValuesByKey(undefined, 'author')).toStrictEqual([]);
  });

  it('Возвращает пустой массив если передан пустой массив', () => {
    expect(getUniqueValuesByKey([], 'author')).toStrictEqual([]);
  });
});

describe('searchTracks', () => {
  it('Находит треки по введённому значению в соответствии с регистром', () => {
    const result = searchTracks('Ma', data);
    expect(result.map((t) => t._id)).toContain(14);
    expect(result.map((t) => t._id)).toContain(17);
    expect(result.length).toBe(2);
  });

  it('Находит треки по введённому значению без учёта регистра: маленькие буквы', () => {
    const result = searchTracks('ma', data);
    expect(result.map((t) => t._id)).toContain(14);
    expect(result.map((t) => t._id)).toContain(17);
    expect(result.length).toBe(2);
  });

  it('Находит треки по введённому значению без учёта регистра: большие буквы', () => {
    const result = searchTracks('MA', data);
    expect(result.map((t) => t._id)).toContain(14);
    expect(result.map((t) => t._id)).toContain(17);
    expect(result.length).toBe(2);
  });

  it('Находит треки по цифрам', () => {
    const result = searchTracks('4', data);
    expect(result).toHaveLength(0);
  });

  it('Возвращает пустой массив если ничего не найдено', () => {
    expect(searchTracks('НесуществующийТрек', data)).toHaveLength(0);
  });

  it('Возвращает весь массив если строка поиска пустая', () => {
    expect(searchTracks('', data)).toEqual(data);
    expect(searchTracks('   ', data)).toEqual(data);
  });

  it('Игнорирует регистр при поиске', () => {
    expect(searchTracks('chase', data)).toHaveLength(1);
    expect(searchTracks('CHASE', data)).toHaveLength(1);
    expect(searchTracks('ChAsE', data)).toHaveLength(1);
  });

  it('Находит треки по полному названию', () => {
    const result = searchTracks('Chase', data);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chase');
  });

  it('Находит треки по части названия', () => {
    const result = searchTracks('Sea', data);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Open Sea epic');
  });
});
