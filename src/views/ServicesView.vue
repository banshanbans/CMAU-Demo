<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">

      <!-- Hero -->
      <section class="py-16 text-center mb-16">
        <p class="text-xs font-bold tracking-widest text-secondary uppercase mb-4">服务体系</p>
        <h1 class="font-headline font-bold text-4xl md:text-5xl tracking-tight text-primary mb-5 leading-tight">
          先让你变得更强，<br class="hidden md:block" />再帮你走出去
        </h1>
        <p class="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          见数不做"申请代理"，而是利用 3000+ 高校合作资源与数据化诊断能力，
          打造以科研能力提升为核心、国际资源对接为出口的升学支持路径。
        </p>
        <router-link to="/assessment"
          class="inline-flex items-center gap-2 mt-8 bg-secondary text-on-secondary
                 px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all
                 shadow-lg shadow-secondary/20">
          <span class="material-symbols-outlined text-[20px]">bolt</span>
          免费开始测评
        </router-link>
      </section>

      <!-- Service Architecture -->
      <section class="mb-16">
        <div class="text-center mb-10">
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">三层服务架构</h2>
          <p class="text-on-surface-variant text-sm">每一层都对应 Credamo 现有的真实能力，没有依赖任何第三方</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(layer, i) in layers" :key="i"
            class="bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden
                   hover:scale-[1.02] transition-all duration-300"
            style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none">
              <span class="material-symbols-outlined text-[80px]">{{ layer.bgIcon }}</span>
            </div>
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              :class="layer.iconBg">
              <span class="material-symbols-outlined text-[24px]" :class="layer.iconColor">{{ layer.icon }}</span>
            </div>
            <div class="text-xs font-bold tracking-widest uppercase mb-2"
              :class="layer.labelColor">第 {{ i + 1 }} 层</div>
            <h3 class="font-headline font-bold text-xl text-on-surface mb-3">{{ layer.title }}</h3>
            <p class="text-sm text-on-surface-variant leading-relaxed mb-5">{{ layer.desc }}</p>
            <div class="pt-4" style="border-top: 1px solid rgba(198,198,205,0.2)">
              <p class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">能力来源</p>
              <p class="text-sm text-on-surface">{{ layer.source }}</p>
            </div>
          </div>
        </div>

        <!-- Arrow connector on desktop -->
        <div class="hidden md:flex justify-center items-center gap-4 mt-6 opacity-40">
          <div class="h-px flex-1 bg-secondary" />
          <span class="material-symbols-outlined text-secondary">arrow_forward</span>
          <div class="h-px flex-1 bg-secondary" />
          <span class="material-symbols-outlined text-secondary">arrow_forward</span>
          <div class="h-px flex-1 bg-secondary" />
        </div>
      </section>

      <!-- Pricing Cards -->
      <section class="mb-16">
        <div class="text-center mb-10">
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">服务产品与定价</h2>
          <p class="text-on-surface-variant text-sm">根据你的测评结果，系统会自动推荐最匹配的方案</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="(plan, i) in plans" :key="i"
            class="rounded-2xl p-7 flex flex-col transition-all duration-300 hover:scale-[1.02]"
            :class="plan.highlight
              ? 'bg-primary-container text-white'
              : 'bg-surface-container-lowest border border-outline-variant/20'"
            style="box-shadow: 0 4px 16px rgba(15,23,42,0.05)">
            <div class="mb-5">
              <span class="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-3 inline-block"
                :class="plan.highlight
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container-high text-on-surface-variant'">
                {{ plan.badge }}
              </span>
              <h3 class="font-headline font-bold text-lg mb-1"
                :class="plan.highlight ? 'text-white' : 'text-on-surface'">
                {{ plan.name }}
              </h3>
              <p class="text-sm leading-relaxed"
                :class="plan.highlight ? 'text-on-primary-container' : 'text-on-surface-variant'">
                {{ plan.desc }}
              </p>
            </div>

            <div class="mb-6">
              <span class="text-3xl font-headline font-bold"
                :class="plan.highlight ? 'text-white' : 'text-on-surface'">
                {{ plan.price }}
              </span>
              <span class="text-sm ml-1"
                :class="plan.highlight ? 'text-on-primary-container' : 'text-on-surface-variant'">
                {{ plan.period }}
              </span>
            </div>

            <ul class="space-y-2.5 mb-7 flex-1">
              <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-2 text-sm">
                <span class="material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0"
                  :class="plan.highlight ? 'text-secondary-container' : 'text-secondary'">
                  check_circle
                </span>
                <span :class="plan.highlight ? 'text-on-primary-container' : 'text-on-surface-variant'">
                  {{ feat }}
                </span>
              </li>
            </ul>

            <router-link :to="plan.link"
              class="flex items-center justify-center w-full py-3.5 rounded-xl font-bold text-sm transition-all gap-1.5"
              :class="plan.highlight
                ? 'bg-secondary text-white hover:opacity-90'
                : 'bg-surface-container-high text-on-surface hover:bg-surface-dim'">
              {{ plan.cta }}
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Trust -->
      <section class="bg-surface-container-lowest rounded-2xl p-10 mb-16"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
        <div class="text-center mb-8">
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">为什么选择见数</h2>
          <p class="text-on-surface-variant text-sm">每一条都是真实资产，不是营销话术</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="trust in trustPoints" :key="trust.title" class="text-center">
            <div class="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-secondary-container/30">
              <span class="material-symbols-outlined text-secondary text-[28px]">{{ trust.icon }}</span>
            </div>
            <p class="font-headline font-bold text-2xl text-on-surface mb-1">{{ trust.stat }}</p>
            <p class="text-sm text-on-surface-variant">{{ trust.title }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="text-center">
        <h2 class="font-headline font-bold text-2xl text-on-surface mb-3">准备好开始了吗？</h2>
        <p class="text-on-surface-variant mb-7">先完成 5 分钟科研准备度测评，获取你的专属路径建议</p>
        <router-link to="/assessment"
          class="inline-flex items-center gap-2 bg-primary text-on-primary
                 px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-all
                 shadow-xl shadow-black/10">
          开始免费测评
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </router-link>
      </section>

    </main>
  </div>
</template>

<script setup>
import AppNav from '../components/AppNav.vue'

const layers = [
  {
    title: '诊断层',
    desc: '科研准备度测评，基于 Credamo 调研平台原生构建。输出用户画像标签与分层建议，驱动后续服务推荐。',
    source: 'Credamo 调研问卷平台 + 数据分析能力',
    icon: 'biotech',
    bgIcon: 'search',
    iconBg: 'bg-secondary-container/30',
    iconColor: 'text-secondary',
    labelColor: 'text-secondary',
  },
  {
    title: '提升层',
    desc: '科研能力培养服务，通过高校合作资源变现。包括训练营、导师配对、课题参与和学术写作支持。',
    source: 'Credamo 3000+ 高校合作资源',
    icon: 'school',
    bgIcon: 'auto_stories',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    labelColor: 'text-blue-600',
  },
  {
    title: '对接层',
    desc: '国际资源对接，利用 Credamo Inc. 美国分公司与海外院校合作网络，提供真实可查的海外背书。',
    source: 'Credamo Inc. + 国际院校合作网络',
    icon: 'public',
    bgIcon: 'flight',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    labelColor: 'text-purple-600',
  },
]

const plans = [
  {
    name: '科研准备度测评',
    badge: '免费',
    desc: '5 分钟获取你的科研准备度报告和用户标签，零门槛开始。',
    price: '¥0',
    period: '/ 次',
    highlight: false,
    link: '/assessment',
    features: ['五维度评分雷达图', '用户分层标签生成', '个性化行动建议 × 3', '推荐服务匹配'],
    cta: '立即开始',
  },
  {
    name: '科研启动包',
    badge: '推荐',
    desc: '3 个月科研方向诊断与路径规划，适合科研背景较弱的备战期学生。',
    price: '¥4,999',
    period: '/ 3个月',
    highlight: true,
    link: '/services/startup-pack',
    features: ['科研方向 1v1 诊断', '文献库建设指导', '每周进度督导', '学术写作基础课'],
    cta: '了解详情',
  },
  {
    name: '导师配对与科研陪跑',
    badge: '深度服务',
    desc: '匹配对应方向导师或助研机会，6-9 个月系统科研产出支持。',
    price: '¥12,800',
    period: '/ 6个月起',
    highlight: false,
    link: '/consult',
    features: ['Credamo 高校导师网络匹配', '科研进度框架支持', '学术写作指导（非代写）', '阶段成果证明'],
    cta: '预约咨询',
  },
  {
    name: '全程陪跑套餐',
    badge: '旗舰',
    desc: '诊断 + 提升 + 对接三层整合，12 个月完整升学支持闭环。',
    price: '¥16,800',
    period: '/ 12个月',
    highlight: false,
    link: '/consult',
    features: ['三层服务全覆盖', '海外院校匹配报告', '申请材料全程指导', '每月进度复盘 × 12'],
    cta: '预约咨询',
  },
]

const trustPoints = [
  { icon: 'school',      stat: '3000+', title: '高校合作资源' },
  { icon: 'location_on', stat: '600+',  title: '城市覆盖' },
  { icon: 'business',    stat: '4000+', title: '企业客户' },
  { icon: 'public',      stat: '美国',  title: 'Credamo Inc. 海外分公司' },
]
</script>
