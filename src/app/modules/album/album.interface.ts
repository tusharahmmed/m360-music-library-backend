export type IAlbumFilters = {
  searchTerm?: string;
};

export type ICreateAlbumPayload = {
  title: string;
  releaseYear: string;
  artists: string[];
  genres: string[];
};
