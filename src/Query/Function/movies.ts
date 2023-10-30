import { GetSearchData, GetRecommendMovies } from "../Types/movies";

//Get Movies
export const GET_SEARCH_MOVIES = async (value: string): Promise<GetSearchData> => await (await fetch(`https://api.themoviedb.org/3/search/movie?query=${value.replace(/\s+/g, '%20')}&include_adult=false&language=en-US&page=1&api_key=c4f00a75ca81ffc8a72eec01038b8ec6`).then(res => res.json()));

//Headers
const headers = {
    "Content-Type": "application/json"
}

//Get Recommend Movies
export const GET_RECOMMEND_MOVIES = async (data: { movie_name: string }): Promise<GetRecommendMovies> => await (await fetch("http://127.0.0.1:5000/movies", { method: "POST", body: JSON.stringify(data), headers }).then(res => res.json()));