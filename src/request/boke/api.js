import { get, post } from './http'

export const listmovie = p => get('/list_movie', p);
