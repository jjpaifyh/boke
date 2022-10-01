import { get, post } from './http'
// 获取歌手前50热门歌
export const apiAddress = p => get('artist/top/song', p);
// 获取歌曲url
export const apiurl = p => get('song/url', p);
// /simi/playlist?id=347230&timestamp=1503019930000
// 手机登录
export const logjjp=p=>get("login/cellphone",p)
// 获取指定歌单
export const apimulist=p=>get("playlist/detail",p)
// 获取歌词
export const apigeci=p=>get("lyric",p)
// 获取歌信息（图片）
// http://music.163.com/api/song/detail/?id={歌曲ID}&ids=%5B{歌曲ID}%5D
// 获取歌曲详情
export const apidata=p=>get('song/detail',p)