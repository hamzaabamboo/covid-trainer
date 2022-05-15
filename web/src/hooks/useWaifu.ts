// src/contexts/index.tsx
import { useState, useEffect } from 'react';
import Axios from 'axios';

export const useWaifus = (): string[] => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    Axios.post<{ newGirls: { image: string; seeds: number[] }[] }>(
      'https://cors-anywhere.herokuapp.com/https://api.waifulabs.com/generate',
      { step: 0 }
    ).then((res) => {
      setImages(
        res.data.newGirls.map(
          (e) => 'data:image/png;charset=utf-8;base64,' + e.image
        )
      );
    });
  }, []);

  return images;
};
