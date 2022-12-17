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

// 评论
export const comment_main=p=>get('/api/comment',p)
// 获取评论用户信息
export const comment_user=p=>get('/api/comment/user_img',p)

//http://192.168.0.205:2000/api/comment/M_id?id=01 
//二级评论列表
export const comment_02=p=>get('/api/comment/M_id',p)

// 添加一级评论
export const comment_add_01=p=>get('/api/comment/add_01',p)

// 添加二级评论
export const comment_add_02=p=>get('/api/comment/add_02',p)