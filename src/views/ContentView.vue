<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="py-10 mb-8">
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">Content Center</p>
        <h1 class="font-headline font-bold text-4xl tracking-tight text-primary mb-4">
          申请准备资料库
        </h1>
        <p class="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          这里整理了科研起步、方向规划、文献阅读、案例故事和赛事活动，
          帮助你把申请准备拆成更清晰的行动。
        </p>
      </section>

      <section class="mb-8">
        <div class="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-card overflow-hidden">
          <div class="flex flex-col lg:flex-row lg:items-center gap-5">
            <div class="flex items-start gap-4 flex-1 min-w-0">
              <div class="icon-shortcut w-12 h-12 rounded-2xl shrink-0">
                <span class="material-symbols-outlined text-[24px] filled">
                  {{ activeBanner.icon }}
                </span>
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <span class="status-badge bg-primary-soft text-primary">
                    {{ activeBanner.eyebrow }}
                  </span>
                </div>
                <h2 class="font-headline font-bold text-xl md:text-2xl text-on-surface leading-snug mb-2">
                  {{ activeBanner.title }}
                </h2>
                <p class="text-sm text-on-surface-variant leading-relaxed max-w-3xl">
                  {{ activeBanner.desc }}
                </p>
              </div>
            </div>

            <div class="flex items-center lg:items-end justify-between gap-4 shrink-0">
              <router-link :to="`/content/${activeBanner.slug}`"
                class="primary-button px-5 py-2.5 text-sm whitespace-nowrap">
                查看专题
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside class="lg:col-span-3">
          <div class="bg-surface-container-lowest rounded-2xl p-6 sticky top-24"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="mb-6">
              <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">内容分类</p>
              <h2 class="font-headline font-bold text-xl text-on-surface mb-2">按当前问题筛选</h2>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                选择与你当前状态更接近的主题，快速找到可用资料。
              </p>
            </div>

            <div class="hidden lg:flex flex-col gap-2">
              <button v-for="tag in contentTags" :key="tag" @click="activeTag = tag"
                class="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                :class="activeTag === tag
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'">
                {{ tag }}
              </button>
            </div>
          </div>
        </aside>

        <div class="lg:col-span-9">
          <div class="lg:hidden flex flex-wrap gap-2 mb-6">
            <button v-for="tag in contentTags" :key="'mobile-' + tag" @click="activeTag = tag"
              class="px-3 py-2 rounded-full text-xs font-bold transition-all"
              :class="activeTag === tag
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'">
              {{ tag }}
            </button>
          </div>

          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <p class="text-sm text-on-surface-variant">当前主题</p>
              <h2 class="font-headline font-bold text-2xl text-on-surface">{{ activeTag }}</h2>
            </div>
            <div class="text-right">
              <p class="text-sm text-on-surface-variant">相关内容</p>
              <p class="font-headline font-bold text-3xl text-primary">{{ filteredArticles.length }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <router-link v-for="article in filteredArticles" :key="article.slug"
              :to="`/content/${article.slug}`"
              class="group bg-surface-container-lowest rounded-2xl p-7 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
              style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 rounded-full bg-surface-container-high text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                    {{ article.category }}
                  </span>
                  <span class="px-2 py-1 rounded-full bg-primary-soft/30 text-[10px] font-bold tracking-widest uppercase text-primary">
                    {{ article.readTime }}
                  </span>
                </div>
                <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                  arrow_outward
                </span>
              </div>

              <h3 class="font-headline font-bold text-xl text-on-surface mb-3 leading-snug">{{ article.title }}</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed mb-5">{{ article.excerpt }}</p>
              <p class="text-sm font-medium text-on-surface mb-4">{{ article.audience }}</p>

              <div class="flex flex-wrap gap-2 pt-5 border-t border-surface-container-high">
                <TagChip v-for="tag in article.tags" :key="article.slug + tag" :color="tagColor(tag)">
                  {{ tag }}
                </TagChip>
              </div>
            </router-link>
          </div>

          <div class="blue-banner rounded-2xl p-8 text-white">
            <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Next Step</p>
            <h3 class="font-headline font-bold text-2xl mb-3">读完资料后，把下一步落到行动里。</h3>
            <p class="text-sm text-white/80 leading-relaxed mb-6 max-w-2xl">
              如果你已经明确问题，可以继续阅读相关内容；如果还不确定优先级，建议先完成准备度测评。
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/assessment"
                class="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
                去做测评
                <span class="material-symbols-outlined text-[18px]">bolt</span>
              </router-link>
              <router-link to="/consult"
                class="inline-flex items-center justify-center gap-2 bg-white text-on-surface px-6 py-3.5 rounded-xl font-bold hover:bg-surface-container-low transition-all">
                预约咨询
                <span class="material-symbols-outlined text-[18px]">event_available</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppNav from '../components/AppNav.vue'
import TagChip from '../components/TagChip.vue'
import { competitionBanners, contentArticles, contentTags } from '../data/content.js'

const activeTag = ref('全部内容')

const filteredArticles = computed(() => {
  if (activeTag.value === '全部内容') return contentArticles
  return contentArticles.filter((article) => article.tags.includes(activeTag.value))
})

const activeBanner = computed(() => competitionBanners[0])

function tagColor(tag) {
  const colorMap = {
    科研空白: 'yellow',
    高焦虑: 'red',
    冲刺期: 'purple',
    方向不清: 'blue',
    'PhD 意向': 'teal',
    时间规划弱: 'gray',
    案例佐证: 'green',
  }

  return colorMap[tag] ?? 'gray'
}

</script>
