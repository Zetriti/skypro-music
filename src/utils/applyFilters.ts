import { TrackType } from '@/shearedTypes/shearedTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = state.PagePlaylist;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.authors.includes(track.author);
    });
  }

  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.genres.some((g) => track.genre.includes(g)),
    );
  }

  if (state.filters.years === 'Сначала новые') {
    filteredPlaylist = [...filteredPlaylist].sort((a, b) => {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
  } else if (state.filters.years === 'Сначала старые') {
    filteredPlaylist = [...filteredPlaylist].sort((a, b) => {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });
  }

  return filteredPlaylist;
};
