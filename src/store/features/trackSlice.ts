import { TrackType } from '@/shearedTypes/shearedTypes';
import { applyFilters } from '@/utils/applyFilters';
import { searchTracks } from '@/utils/helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shaffledPlaylist: TrackType[];
  favoriteTracks: TrackType[];
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  filters: {
    authors: string[];
    genres: string[];
    years: string;
    searchString: string;
  };
  PagePlaylist: TrackType[];
  filteredTracks: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  isShuffle: false,
  shaffledPlaylist: [],
  favoriteTracks: [],
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
    searchString: '',
  },
  PagePlaylist: [],
  filteredTracks: [],
};

const updateFilteredTracks = (state: initialStateType) => {
  const filteredByFilters = applyFilters(state);
  state.filteredTracks = searchTracks(
    state.filters.searchString,
    filteredByFilters,
  );
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
      state.shaffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shaffledPlaylist
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex < playlist.length - 1) {
        const nextIndexTrack = curIndex + 1;
        state.currentTrack = playlist[nextIndexTrack];
      }
    },
    setBackTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shaffledPlaylist
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex >= 1) {
        const nextIndexTrack = curIndex - 1;
        state.currentTrack = playlist[nextIndexTrack];
      }
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      const exists = state.favoriteTracks.some(
        (t) => t._id === action.payload._id,
      );
      if (!exists) {
        state.favoriteTracks = [...state.favoriteTracks, action.payload];
      }
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (t) => t._id !== action.payload._id,
      );
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFeatchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFeatchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action) => {
      state.PagePlaylist = action.payload;
    },

    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => {
          return el != author;
        });
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }

      updateFilteredTracks(state);
    },

    setFilterGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter(
          (el) => el !== genre,
        );
      } else {
        state.filters.genres = [...state.filters.genres, genre];
      }

      updateFilteredTracks(state);
    },

    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      updateFilteredTracks(state);
      console.log('Отсортированный массив: ', state.filteredTracks);
    },
    resetFilters: (state) => {
      state.filters = {
        authors: [],
        genres: [],
        years: 'По умолчанию',
        searchString: '',
      };
      state.filteredTracks = state.PagePlaylist;
    },

    setSearchString: (state, action: PayloadAction<string>) => {
      state.filters.searchString = action.payload;
      const filteredByFilters = applyFilters(state);
      state.filteredTracks = searchTracks(
        state.filters.searchString,
        filteredByFilters,
      );
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  setBackTrack,
  toggleShuffle,
  setAllTracks,
  setFeatchError,
  setFeatchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthors,
  setPagePlaylist,
  setFilterGenre,
  setFilterYears,
  resetFilters,
  setSearchString,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
