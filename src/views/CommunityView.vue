<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-10 mb-8">
        <div class="lg:col-span-7">
          <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">Research Community</p>
          <h1 class="font-headline font-bold text-4xl md:text-5xl tracking-tight text-primary leading-tight mb-5">
            科研成长社群
          </h1>
          <p class="text-lg text-on-surface-variant leading-relaxed max-w-2xl mb-8">
            和同阶段申请者一起推进文献阅读、方向共创、导师交流和国际项目准备。
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#discussion"
              class="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined text-[20px]">forum</span>
              加入讨论
            </a>
            <router-link to="/consult"
              class="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-on-surface px-8 py-4 rounded-xl font-bold border border-outline-variant/20 hover:bg-white transition-all">
              预约交流
              <span class="material-symbols-outlined text-[20px]">event_available</span>
            </router-link>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-surface-container-lowest rounded-2xl p-6 md:p-7 relative overflow-hidden shadow-card">
            <div class="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary-soft blur-3xl pointer-events-none" />
            <div class="relative">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <p class="text-xs font-bold tracking-widest uppercase text-primary mb-1">本周同行</p>
                  <h2 class="font-headline font-bold text-2xl text-on-surface">一起推进的人</h2>
                </div>
                <span class="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                  <span class="h-2 w-2 rounded-full bg-primary" />
                  24 人在线
                </span>
              </div>

              <div class="flex gap-4 overflow-hidden mb-6">
                <div v-for="member in members" :key="member.name" class="w-20 shrink-0 text-center">
                  <div class="relative mx-auto mb-2 h-14 w-14 rounded-full bg-primary-soft p-1">
                    <div class="flex h-full w-full items-center justify-center rounded-full text-sm font-bold text-primary"
                      :class="member.bg">
                      {{ member.avatar }}
                    </div>
                    <span v-if="member.active"
                      class="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-success" />
                  </div>
                  <p class="truncate text-xs font-semibold text-on-surface">{{ member.name }}</p>
                  <p class="truncate text-[11px] text-on-surface-variant">{{ member.stage }}</p>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div v-for="stat in communityStats" :key="stat.label"
                  class="rounded-2xl bg-surface-container-low p-4 text-center">
                  <p class="font-headline text-2xl font-bold text-primary">{{ stat.value }}</p>
                  <p class="text-xs text-on-surface-variant">{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-8">
        <div class="flex gap-3 overflow-x-auto pb-2">
          <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
            class="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all"
            :class="activeTab === tab.value
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-primary-soft/70'">
            <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8">
          <section class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-card mb-6">
            <div class="flex items-center justify-between gap-4 mb-6">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">Live Rooms</p>
                <h2 class="font-headline font-bold text-2xl text-on-surface">正在进行</h2>
              </div>
              <router-link to="/content"
                class="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                查看活动
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </router-link>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article v-for="room in liveRooms" :key="room.title"
                class="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/10">
                <div class="flex items-center justify-between mb-5">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-danger">
                    <span class="h-1.5 w-1.5 rounded-full bg-danger" />
                    Live
                  </span>
                  <span class="text-xs font-semibold text-on-surface-variant">{{ room.people }}</span>
                </div>
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary">
                  <span class="material-symbols-outlined text-[24px]">{{ room.icon }}</span>
                </div>
                <h3 class="font-headline font-bold text-lg text-on-surface mb-2 leading-snug">{{ room.title }}</h3>
                <p class="text-sm text-on-surface-variant leading-relaxed mb-5">{{ room.desc }}</p>
                <button class="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  进入房间
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </article>
            </div>
          </section>

          <section id="discussion" class="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-card">
            <div class="flex items-center justify-between gap-4 mb-6">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">Feed</p>
                <h2 class="font-headline font-bold text-2xl text-on-surface">社群动态</h2>
              </div>
              <button
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-bold hover:bg-primary-hover transition-all">
                发布进展
                <span class="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            <div class="space-y-4">
              <article v-for="post in filteredPosts" :key="post.title"
                class="rounded-2xl border border-outline-variant/10 bg-white p-5 transition-all hover:border-primary/30">
                <div class="flex items-start gap-4">
                  <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-primary"
                    :class="post.avatarBg">
                    {{ post.avatar }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div>
                        <p class="font-bold text-on-surface">{{ post.author }}</p>
                        <p class="text-xs text-on-surface-variant">{{ post.time }} · {{ post.group }}</p>
                      </div>
                      <span class="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {{ post.type }}
                      </span>
                    </div>
                    <h3 class="font-headline font-bold text-lg text-on-surface mb-2">{{ post.title }}</h3>
                    <p class="text-sm text-on-surface-variant leading-relaxed mb-4">{{ post.body }}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <TagChip v-for="tag in post.tags" :key="post.title + tag.label" :color="tag.color">
                        {{ tag.label }}
                      </TagChip>
                    </div>
                    <div class="flex items-center gap-5 text-xs font-bold text-on-surface-variant">
                      <button class="inline-flex items-center gap-1 hover:text-primary">
                        <span class="material-symbols-outlined text-[16px]">thumb_up</span>
                        {{ post.likes }}
                      </button>
                      <button class="inline-flex items-center gap-1 hover:text-primary">
                        <span class="material-symbols-outlined text-[16px]">mode_comment</span>
                        {{ post.comments }}
                      </button>
                      <button class="inline-flex items-center gap-1 hover:text-primary">
                        <span class="material-symbols-outlined text-[16px]">bookmark</span>
                        收藏
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>

        <aside class="lg:col-span-4 space-y-6">
          <section class="bg-surface-container-lowest rounded-2xl p-6 shadow-card">
            <div class="flex items-center justify-between mb-5">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">Invitations</p>
                <h2 class="font-headline font-bold text-2xl text-on-surface">社群邀请</h2>
              </div>
              <span class="inline-flex min-w-6 items-center justify-center rounded-full bg-danger px-2 py-1 text-xs font-bold text-white">
                3
              </span>
            </div>
            <div class="space-y-3">
              <div v-for="invite in invitations" :key="invite.title"
                class="rounded-2xl bg-surface-container-low p-4">
                <div class="flex items-start justify-between gap-3 mb-3">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary font-bold">
                      {{ invite.avatar }}
                    </div>
                    <div>
                      <p class="font-semibold text-on-surface">{{ invite.title }}</p>
                      <p class="text-xs text-on-surface-variant">{{ invite.host }}</p>
                    </div>
                  </div>
                  <span v-if="invite.unread" class="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <p class="text-sm text-on-surface-variant leading-relaxed mb-4">{{ invite.desc }}</p>
                <button class="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  接受邀请
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          <section class="blue-banner rounded-2xl p-6 text-white">
            <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Quick Actions</p>
            <div class="space-y-3">
              <router-link v-for="action in quickActions" :key="action.label" :to="action.to"
                class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                <span class="font-semibold text-white">{{ action.label }}</span>
                <span class="material-symbols-outlined text-[18px] text-white">{{ action.icon }}</span>
              </router-link>
            </div>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppNav from '../components/AppNav.vue'
import TagChip from '../components/TagChip.vue'

const activeTab = ref('all')

const tabs = [
  { value: 'all', label: '全部', icon: 'apps' },
  { value: 'reading', label: '文献共读', icon: 'auto_stories' },
  { value: 'mentor', label: '导师交流', icon: 'school' },
  { value: 'project', label: '项目机会', icon: 'hub' },
  { value: 'global', label: '国际交流', icon: 'public' },
]

const members = [
  { name: '陈同学', stage: '方向探索', avatar: '陈', bg: 'bg-white', active: true },
  { name: 'Robert', stage: 'PhD 申请', avatar: 'R', bg: 'bg-blue-100', active: true },
  { name: '林同学', stage: '文献训练', avatar: '林', bg: 'bg-primary-soft', active: false },
  { name: 'Dianne', stage: '项目准备', avatar: 'D', bg: 'bg-emerald-100', active: true },
  { name: '周同学', stage: '申请冲刺', avatar: '周', bg: 'bg-yellow-100', active: false },
]

const communityStats = [
  { value: '8', label: '共读小组' },
  { value: '16', label: '本周活动' },
  { value: '42', label: '任务打卡' },
]

const liveRooms = [
  {
    icon: 'menu_book',
    title: '教育心理文献共读',
    desc: '从研究问题、变量关系和方法设计三个角度做拆解。',
    people: '41 人',
  },
  {
    icon: 'psychology',
    title: '研究方向 30 分钟快诊',
    desc: '带着 1 个想法和 2 篇文献进入导师交流。',
    people: '18 人',
  },
  {
    icon: 'public',
    title: '海外暑研申请复盘',
    desc: '梳理项目选择、邮件沟通和时间节点。',
    people: '27 人',
  },
]

const posts = [
  {
    category: 'reading',
    author: '李同学',
    avatar: '李',
    avatarBg: 'bg-primary-soft',
    time: '12 分钟前',
    group: '文献共读',
    type: '进展',
    title: '完成第一轮核心文献筛选',
    body: '把学习分析方向 8 篇文献按研究对象、数据来源和方法路径整理成表格。',
    likes: 18,
    comments: 6,
    tags: [
      { label: '文献训练', color: 'blue' },
      { label: '方向初步', color: 'teal' },
    ],
  },
  {
    category: 'mentor',
    author: '王老师',
    avatar: '王',
    avatarBg: 'bg-blue-100',
    time: '1 小时前',
    group: '导师交流',
    type: '反馈',
    title: '本周方向诊断名单已更新',
    body: '优先开放给完成测评报告、已有 1 版研究兴趣描述的同学。',
    likes: 32,
    comments: 11,
    tags: [
      { label: '导师反馈', color: 'purple' },
      { label: '预约咨询', color: 'green' },
    ],
  },
  {
    category: 'project',
    author: 'Credamo 学术运营',
    avatar: '见',
    avatarBg: 'bg-primary text-white',
    time: '昨天 18:30',
    group: '项目机会',
    type: '招募',
    title: '学习行为数据标注项目开放报名',
    body: '适合希望补充研究协作经历、熟悉数据编码流程的申请者。',
    likes: 45,
    comments: 14,
    tags: [
      { label: '助研机会', color: 'yellow' },
      { label: '科研空白', color: 'red' },
    ],
  },
  {
    category: 'global',
    author: '周同学',
    avatar: '周',
    avatarBg: 'bg-emerald-100',
    time: '2 天前',
    group: '国际交流',
    type: '复盘',
    title: '海外项目邮件模板已完成第一版',
    body: '导师建议继续压缩背景介绍，把研究兴趣和可投入时间写得更明确。',
    likes: 26,
    comments: 8,
    tags: [
      { label: '国际交流', color: 'teal' },
      { label: '材料准备', color: 'gray' },
    ],
  },
]

const invitations = [
  {
    title: '跨学科研究小组',
    host: '王老师 · 本周三',
    avatar: '王',
    desc: 'AI+教育、心理测量、社会科学方法方向共创。',
    unread: true,
  },
  {
    title: 'PhD 申请互评',
    host: 'Dianne · 周五晚',
    avatar: 'D',
    desc: '研究计划、导师邮件和项目清单互评。',
    unread: true,
  },
  {
    title: '暑研项目复盘会',
    host: 'Robert · 周六',
    avatar: 'R',
    desc: '海外暑研申请节奏、套磁邮件和面试准备。',
    unread: false,
  },
]

const quickActions = [
  { label: '完成本周打卡', icon: 'task_alt', to: '/dashboard/progress' },
  { label: '查看内容建议', icon: 'article', to: '/content' },
  { label: '预约导师交流', icon: 'event_available', to: '/consult' },
]

const filteredPosts = computed(() => {
  if (activeTab.value === 'all') return posts
  return posts.filter((post) => post.category === activeTab.value)
})
</script>
