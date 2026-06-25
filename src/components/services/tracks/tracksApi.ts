import axios from 'axios';
import { TrackType } from '@/shearedTypes/shearedTypes';
import { BASE_URL } from '../constants';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

interface SelectionResponse {
  data: {
    name: string;
    items: number[];
  };
}
export const getSelect = async (id: string) => {
  const selectionRes = await axios<SelectionResponse>(
    `${BASE_URL}/catalog/selection/${id}/`,
  );
  const selectionData = selectionRes.data.data;
  return {
    name: selectionData.name,
    trackIds: selectionData.items.map((item) => Number(item)),
  };
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getFavoriteTracks = (access: string): Promise<TrackType[]> => {
  return axios
    .get(BASE_URL + '/catalog/track/favorite/all/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => res.data.data);
};
