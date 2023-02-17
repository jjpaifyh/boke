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

// 获取md文件信息
export const text_get_md=p=>get('/api/text_md_get',p)

//图片上传
export const list_post=p=>post('/list_post',p)

//md上传
export const text_md_watch=p=>get('/api/text_md_watch',p)

// 阅读+1
export const read_v1=p=>get('/api/read',p)

// 评论+1
export const comment_v1=p=>get('/api/comment_v1',p)

// 喜欢+1
export const like_v1=p=>get('/api/like_v1',p)

// 喜欢-1
export const likeCancel_v1=p=>get('/api/likeCancel_v1',p)

// 搜索
export const search_v1=p=>get('/api/search_v1',p)

//新文章创建数据
export const newArticleLike=p=>get('/api/newArticleLike',p)

// 获取用户在当前文章点赞状态
export const userStateArticleLike=p=>get('/api/userStateArticleLike',p)

// 获取当前文章信息
export const articleModification=p=>get('/api/articleModification',p)

// 保存修改的文章
export const Compile=p=>get('/api/Compile',p)

// 删除文章文章
export const articleDelete=p=>get('/api/articleDelete',p)

// 首页请求指定页面数据
export const pagedata=p=>get('/api/page',p)