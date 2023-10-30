export interface GetSearchData {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    adult: boolean;
    backdrop_path?: null | string;
    id: number;
    name?: string;
    original_language?: string;
    original_name?: string;
    overview?: string;
    poster_path?: string;
    media_type: MediaType;
    genre_ids?: number[];
    popularity: number;
    first_air_date?: Date;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];
    gender?: number;
    known_for_department?: string;
    profile_path?: null | string;
    known_for?: KnownFor[];
    title?: string;
    original_title?: string;
    release_date?: Date;
    video?: boolean;
}

export interface KnownFor {
    adult: boolean;
    backdrop_path: null | string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: null | string;
    media_type: MediaType;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum MediaType {
    Movie = "movie",
    Person = "person",
    Tv = "tv",
}

export interface GetRecommendMovies {
    code: number;
    results?: SingleMovies[]
    message?: string
}

export interface SingleMovies {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    videos: Videos
    vote_average: number
    vote_count: number
}

export interface BelongsToCollection {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
}

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface Videos {
    results: VideosResults[]
}

export interface VideosResults {
    id: string
    iso_3166_1: string
    iso_639_1: string
    key: string
    name: string
    official: boolean
    published_at: string
    site: string
    size: number
    type: string
}