import type { Platform, WechatPublic } from '@/types'

export const platforms: Platform[] = [
  {
    id: 'wechat-video',
    name: '微信视频号',
    label: '全部内容',
    url: 'https://channels.weixin.qq.com/user/placeholder',
    icon: 'video',
    color: 'accent-cool',
  },
  {
    id: 'douyin',
    name: '抖音',
    label: '全部内容',
    url: 'https://www.douyin.com/user/placeholder',
    icon: 'music',
    color: 'accent-cool',
  },
  {
    id: 'bilibili',
    name: '哔哩哔哩',
    label: '科技 AI',
    url: 'https://space.bilibili.com/placeholder',
    icon: 'tv',
    color: 'accent-cool',
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    label: '生活养生',
    url: 'https://www.xiaohongshu.com/user/placeholder',
    icon: 'book',
    color: 'accent-warm',
  },
]

export const wechatPublic: WechatPublic = {
  name: '微信公众号',
  label: '扫码关注',
  qrcodePath: '/images/qrcode-wechat.jpg',
  color: 'accent-warm',
}
