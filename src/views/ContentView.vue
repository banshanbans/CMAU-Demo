<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="py-10 mb-8">
        <p class="text-xs font-bold tracking-widest uppercase text-secondary mb-4">Content Center</p>
        <h1 class="font-headline font-bold text-4xl tracking-tight text-primary mb-4">
          用标签组织内容，而不是把所有信息平铺给所有人。
        </h1>
        <p class="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          这里的内容不是泛资讯，而是根据用户所处阶段组织的方法文章、诊断引导和案例佐证。
          标签决定你先看到什么，也决定你下一步应该去测评、阅读还是预约咨询。
        </p>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside class="lg:col-span-3">
          <div class="bg-surface-container-lowest rounded-2xl p-6 sticky top-24"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="mb-6">
              <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">筛选逻辑</p>
              <h2 class="font-headline font-bold text-xl text-on-surface mb-2">按用户标签看内容</h2>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                标签不是装饰，它决定文章优先分发给谁。
              </p>
            </div>

            <div class="hidden lg:flex flex-col gap-2">
              <button v-for="tag in contentTags" :key="tag" @click="activeTag = tag"
                class="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                :class="activeTag === tag
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
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
                ? 'bg-secondary text-white'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'">
              {{ tag }}
            </button>
          </div>

          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <p class="text-sm text-on-surface-variant">当前筛选</p>
              <h2 class="font-headline font-bold text-2xl text-on-surface">{{ activeTag }}</h2>
            </div>
            <div class="text-right">
              <p class="text-sm text-on-surface-variant">命中内容</p>
              <p class="font-headline font-bold text-3xl text-primary">{{ filteredArticles.length }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <router-link v-for="article in filteredArticles" :key="article.slug"
              :to="`/content/${article.slug}`"
              class="group bg-surface-container-lowest rounded-2xl p-7 border border-outline-variant/20 hover:border-secondary/30 transition-all duration-300 hover:scale-[1.02]"
              style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 rounded-full bg-surface-container-high text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                    {{ article.category }}
                  </span>
                  <span class="px-2 py-1 rounded-full bg-secondary-container/30 text-[10px] font-bold tracking-widest uppercase text-secondary">
                    {{ article.readTime }}
                  </span>
                </div>
                <span class="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
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

          <div class="bg-primary-container rounded-2xl p-8 text-white">
            <p class="text-[10px] font-bold tracking-widest uppercase text-on-primary-container mb-3">Next Step</p>
            <h3 class="font-headline font-bold text-2xl mb-3">内容不是终点，下一步要么测评，要么咨询。</h3>
            <p class="text-sm text-on-primary-container leading-relaxed mb-6 max-w-2xl">
              如果你已经知道自己卡在哪，就继续看相关文章；如果你还说不清自己的标签与状态，先去测评会更高效。
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/assessment"
                class="inline-flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
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
import { contentArticles, contentTags } from '../data/content.js'

const activeTag = ref('全部内容')

const filteredArticles = computed(() => {
  if (activeTag.value === '全部内容') return contentArticles
  return contentArticles.filter((article) => article.tags.includes(activeTag.value))
})

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
