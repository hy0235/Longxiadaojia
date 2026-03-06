import { Type } from "@google/genai";

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  hardware?: string;
  type: 'remote' | 'onsite' | 'hardware';
}

export interface Tuner {
  id: string;
  name: string;
  avatar: string;
  tags: string[];
  manifesto: string;
  rating: number;
  orders: number;
  skills: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'p1',
    name: '初见·轻触',
    price: 199,
    description: '远程轻量调试，扫清启动障碍。像初雪般轻柔。',
    hardware: '仅远程 / 纯软件',
    type: 'remote'
  },
  {
    id: 'p2',
    name: '深入·共鸣',
    price: 599,
    description: '上门全身心环境部署。配置 Docker 与镜像，让龙虾在您的 Mac 里丝滑律动。',
    hardware: '现场部署',
    type: 'onsite'
  },
  {
    id: 'p3',
    name: '至臻·伴侣',
    price: 2599,
    description: '带上一台 Mac Mini (Intel) 登门。从硬件到软件，为您打理好一切，无需您动一根手指。',
    hardware: '含 二手 Mac Mini',
    type: 'hardware'
  },
  {
    id: 'p4',
    name: '巅峰·永恒',
    price: 3999,
    description: '旗舰 Mac Mini (M4) 尊享包。极速性能，深度优化，陪您度过每一个自动化的夜晚。',
    hardware: '含 全新 M4 版',
    type: 'hardware'
  }
];

export const MOCK_TUNERS: Tuner[] = [
  {
    id: 't1',
    name: '首席调试员-克里斯',
    avatar: 'https://picsum.photos/seed/professional-man-beard/400/600',
    tags: ['格纹衫战神', '发际线坚挺', 'Mac 专家'],
    manifesto: '我会像对待艺术品一样对待您的 OpenClaw',
    rating: 4.9,
    orders: 128,
    skills: ['Docker', 'Proxy Tuning', 'Hardware Repair']
  },
  {
    id: 't2',
    name: '灵动架构师-苏菲',
    avatar: 'https://picsum.photos/seed/tech-woman/400/600',
    tags: ['自带机械键盘', '镜像优化', '温柔耐心'],
    manifesto: '代码是有温度的，我希望能为您传递这份温暖。',
    rating: 5.0,
    orders: 85,
    skills: ['Shell Scripting', 'Network Security', 'M4 Optimization']
  },
  {
    id: 't3',
    name: '极客管家-阿强',
    avatar: 'https://picsum.photos/seed/bearded-hacker/400/600',
    tags: ['黑框眼镜加持', '内网穿透', '24h 响应'],
    manifesto: '深夜部署，手有余香。您的需求就是我的使命。',
    rating: 4.8,
    orders: 210,
    skills: ['Python', 'Docker', 'Mac Mini Hardware']
  },
  {
    id: 't4',
    name: '架构总监-大卫',
    avatar: 'https://picsum.photos/seed/suit-man/400/600',
    tags: ['西装暴徒', '架构重构', '资深专家'],
    manifesto: '卓越的架构是自动化的基石，我为您筑基。',
    rating: 4.9,
    orders: 156,
    skills: ['System Architecture', 'Enterprise Deployment', 'Security Audit']
  }
];
