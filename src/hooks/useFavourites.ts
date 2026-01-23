'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'showcase-favourites';
const FAVOURITES_UPDATED_EVENT = 'favourites-updated';

// Helper to read current favourites from localStorage
const getFavouritesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper to save favourites to localStorage and dispatch event
const saveFavouritesToStorage = (favourites: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  window.dispatchEvent(new CustomEvent(FAVOURITES_UPDATED_EVENT));
};

// For components that only need to check one listing (FavouriteButton)
export function useIsFavourite(listingId: string) {
  const [isFav, setIsFav] = useState(() => 
    getFavouritesFromStorage().includes(listingId)
  );

  useEffect(() => {
    const handleUpdate = () => {
      setIsFav(getFavouritesFromStorage().includes(listingId));
    };
    
    window.addEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [listingId]);

  const toggle = useCallback(() => {
    const currentFavourites = getFavouritesFromStorage();
    let newFavourites: string[];
    
    if (currentFavourites.includes(listingId)) {
      newFavourites = currentFavourites.filter(id => id !== listingId);
    } else {
      newFavourites = [...currentFavourites, listingId];
    }
    
    saveFavouritesToStorage(newFavourites);
  }, [listingId]);

  return { isFavourite: isFav, toggle };
}

// For components that need the full list (Favourites page, Header count)
export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>(getFavouritesFromStorage);

  useEffect(() => {
    const handleUpdate = () => {
      setFavourites(getFavouritesFromStorage());
    };
    
    window.addEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const toggleFavourite = useCallback((listingId: string) => {
    const currentFavourites = getFavouritesFromStorage();
    let newFavourites: string[];
    
    if (currentFavourites.includes(listingId)) {
      newFavourites = currentFavourites.filter(id => id !== listingId);
    } else {
      newFavourites = [...currentFavourites, listingId];
    }
    
    saveFavouritesToStorage(newFavourites);
  }, []);

  const removeFavourite = useCallback((listingId: string) => {
    const currentFavourites = getFavouritesFromStorage();
    const newFavourites = currentFavourites.filter(id => id !== listingId);
    saveFavouritesToStorage(newFavourites);
  }, []);

  return {
    favourites,
    toggleFavourite,
    removeFavourite,
    count: favourites.length,
  };
}
