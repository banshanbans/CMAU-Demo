<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <template v-if="article">
        <section class="mb-8">
          <router-link to="/content"
            class="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline mb-6">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            返回内容中心
          </router-link>

          <div class="bg-surface-container-lowest rounded-2xl p-8"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="flex flex-wrap gap-2 mb-5">
              <span class="px-2 py-1 rounded-full bg-surface-container-high text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                {{ article.category }}
              </span>
              <span class="px-2 py-1 rounded-full bg-secondary-container/30 text-[10px] font-bold tracking-widest uppercase text-secondary">
                {{ article.readTime }}
              </span>
              <TagChip v-for="tag in article.tags" :key="tag" :color="tagColor(tag)">
                {{ tag }}
              </TagChip>
            </div>

            <h1 class="font-headline font-bold text-4xl tracking-tight text-primary leading-tight mb-4">
              {{ article.title }}
            </h1>
            <p class="text-lg text-on-surface-variant leading-relaxed mb-6">
              {{ article.excerpt }}
            </p>

            <div class="bg-surface-container-low rounded-2xl p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-secondary mb-2">适合谁阅读</p>
              <p class="text-sm text-on-surface">{{ article.audience }}</p>
            </div>
          </div>
        </section>

        <section class="bg-surface-container-lowest rounded-2xl p-8 mb-8"
                 style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <article class="space-y-8">
            <section v-for="section in article.bodySections" :key="section.heading">
              <h2 class="font-headline font-bold text-2xl text-on-surface mb-4">{{ section.heading }}</h2>
              <div class="space-y-4">
                <p v-for="paragraph in section.paragraphs" :key="paragraph"
                  class="text-base leading-8 text-on-surface-variant">
                  {{ paragraph }}
                </p>
              </div>
              <ul v-if="section.bullets?.length" class="mt-5 space-y-3">
                <li v-for="bullet in section.bullets" :key="bullet"
                  class="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">check_circle</span>
                  <span>{{ bullet }}</span>
                </li>
              </ul>
            </section>
          </article>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-primary-container rounded-2xl p-7 text-white">
            <p class="text-[10px] font-bold tracking-widest uppercase text-on-primary-container mb-2">Next Action</p>
            <h3 class="font-headline font-bold text-2xl mb-3">看完之后，先判断你属于哪种状态。</h3>
            <p class="text-sm text-on-primary-container leading-relaxed mb-5">
              如果你还无法清楚判断自己是“科研空白”“冲刺期”还是“高焦虑”，先做测评比继续泛看内容更高效。
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <router-link to="/assessment"
                class="inline-flex items-center justify-center gap-2 bg-secondary text-white px-5 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                去做测评
                <span class="material-symbols-outlined text-[18px]">bolt</span>
              </router-link>
              <router-link to="/consult"
                class="inline-flex items-center justify-center gap-2 bg-white text-on-surface px-5 py-3 rounded-xl font-bold hover:bg-surface-container-low transition-all">
                预约咨询
                <span class="material-symbols-outlined text-[18px]">event_available</span>
              </router-link>
            </div>
          </div>

          <div class="bg-surface-container-lowest rounded-2xl p-7 border border-outline-variant/20"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">相关阅读</p>
            <div class="space-y-4">
              <router-link v-for="item in relatedArticles" :key="item.slug"
                :to="`/content/${item.slug}`"
                class="block rounded-xl bg-surface-container-low p-4 hover:bg-surface-container-high transition-colors">
                <p class="text-sm font-semibold text-on-surface mb-1">{{ item.title }}</p>
                <p class="text-xs text-on-surface-variant">{{ item.category }} · {{ item.readTime }}</p>
              </router-link>
            </div>
          </div>
        </section>
      </template>

      <section v-else class="bg-surface-container-lowest rounded-2xl p-10 text-center"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
        <h1 class="font-headline font-bold text-3xl text-on-surface mb-3">内容建设中</h1>
        <p class="text-on-surface-variant mb-6">这篇文章的详情还没有整理完成，你可以先返回内容中心查看其他文章。</p>
        <router-link to="/content"
          class="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
          返回内容中心
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from '../components/AppNav.vue'
import TagChip from '../components/TagChip.vue'
import { contentArticles } from '../data/content.js'

const route = useRoute()

const article = computed(() =>
  contentArticles.find((item) => item.slug === route.params.slug)
)

const relatedArticles = computed(() => {
  if (!article.value) return []

  return contentArticles
    .filter((item) => item.slug !== article.value.slug)
    .sort((a, b) => {
      const aScore = a.tags.filter((tag) => article.value.tags.includes(tag)).length
      const bScore = b.tags.filter((tag) => article.value.tags.includes(tag)).length
      return bScore - aScore
    })
    .slice(0, 3)
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
