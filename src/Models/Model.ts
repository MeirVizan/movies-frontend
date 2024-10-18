export interface Identifiable {
    id: string;
    name: string;
}

export interface MovieInterface {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: any;
    vote_count: number;
}

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: Array<string>;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<any>;
    production_countries: Array<any>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<any>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genre extends Identifiable { };

export interface Character {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export interface TvShowInterface {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;

}

export interface TvShowDetails {
    adult: boolean;
    backdrop_path: string;
    created_by: Array<any>;
    episode_run_time: Array<number>;
    first_air_date: string;
    genres: Array<any>;
    homepage: string;
    id: number;
    in_production: boolean;
    languages: Array<string>;
    last_air_date: string;
    last_episode_to_air: any;
    name: string;
    networks: Array<any>;
    next_episode_to_air: any;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<any>;
    production_countries: Array<any>;
    seasons: Array<any>;
    spoken_languages: Array<any>;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;

}

export interface FetchMoviesResponse {
    results: MovieInterface[];
}

export interface FetchTvShowsResponse {
    results: TvShowInterface[];
}

export interface FetchCharactersResponse {
    cast: Character[];
}

export interface FetchUserResponse {
    id: string;
    email: string;
    name: string;
}



// export interface MovieResponse {
//     page: number;
//     results: MovieInterface[];
//     total_pages: number;
//     total_results: number;
// }

// export interface TvShowResponse {
//     page: number;
//     results: TvShow[];
//     total_pages: number;
//     total_results: number;
// }

// export interface GenreResponse {
//     genres: Genre[];
// }

// export interface MovieDetailsResponse {
//     id: number;
//     backdrop_path: string;
//     title: string;
//     release_date: string;
//     vote_average: number;
//     overview: string;
//     genres: {
//         id: number;
//         name: string;
//     }[];
//     runtime: number;
// }
