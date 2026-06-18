import axios from 'axios';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { BASE_URL } from '../constants';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getSelect = async (
  id: string,
): Promise<{ name: string; tracks: TrackType[] }> => {
  const selectionRes = await axios(`${BASE_URL}/catalog/selection/${id}/`);
  const selectionData = selectionRes.data.data;
  const name = selectionData.name;
  const trackIds = selectionData.items;
  const allTracks = await getTracks();
  const selectedTracks = allTracks.filter((track) =>
    trackIds.includes(track._id),
  );
  return { name, tracks: selectedTracks };
};
