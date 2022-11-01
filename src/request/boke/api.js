import { get, post } from './http'

export const listmovie = p => get('/list_movie', p);
// 获取首页文章展示的数据
export const listhome=p=>get('/api/homelist',p)
// qq入库
export const qq_rk=p=>get('/api/qq_zq',p)
// 入库qq账号查询
export const qq_cx=p=>get('/api/querycondition_qq',p)

// 首页前五评论
export const pl_q=p=>get('/api/pllist',p)

// 推荐文章
export const tj_article=p=>get('/api/tuijianwz',p)
