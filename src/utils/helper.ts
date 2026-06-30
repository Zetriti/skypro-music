import { TrackType } from '@/shearedTypes/shearedTypes';

export function getUniqueValuesByKey(
  arr: TrackType[] | null | undefined,
  key: keyof TrackType,
): string[] {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v != null) {
          uniqueValues.add(String(v));
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    } else if (typeof value === 'number') {
      uniqueValues.add(String(value));
    }
  });

  return Array.from(uniqueValues);
}

export function formatTime(time: number) {
  if (time < 0) {
    return '0:00';
  }

  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime !== undefined && totalTime !== null) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
  return undefined;
};

export function searchTracks(query: string, arr: TrackType[]): TrackType[] {
  if (!query.trim()) {
    return arr;
  }
  return arr.filter((track) =>
    track.name.toLowerCase().includes(query.toLowerCase().trim()),
  );
}
