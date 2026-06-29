import type { Platform, WechatPublic } from '@/types'

export const platforms: Platform[] = [
  {
    id: 'wechat-video',
    name: '微信视频号',
    label: '搜索「最喜欢真真的小陈」',
    url: '', // 视频号无直链，需在微信内搜索
    icon: 'video',
    color: 'accent-cool',
  },
  {
    id: 'douyin',
    name: '抖音',
    label: '搜索「最喜欢真真的小陈」',
    url: '', // 抖音无法直接跳转个人主页
    icon: 'music',
    color: 'accent-cool',
  },
  {
    id: 'bilibili',
    name: '哔哩哔哩',
    label: '科技 AI',
    url: 'https://space.bilibili.com/24652369',
    icon: 'tv',
    color: 'accent-cool',
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    label: '生活养生',
    url: 'https://www.xiaohongshu.com/user/profile/5b500193f7e8b939e0e98def',
    icon: 'book',
    color: 'accent-warm',
  },
]

export const wechatPublic: WechatPublic = {
  name: '微信公众号',
  label: '扫码关注',
  qrcodePath: '/images/vxgzh.jpg',
  color: 'accent-warm',
}
