<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <section class="py-10 mb-8">
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">Consult Booking</p>
        <h1 class="font-headline font-bold text-4xl tracking-tight text-primary mb-4">
          预约 1v1 咨询，明确你的科研升学下一步。
        </h1>
        <p class="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          选择适合你的咨询类型和可沟通时间，顾问会根据你的背景、目标和当前困惑准备沟通建议。
          你可以先选择咨询类型，再提交时间和需求摘要。
        </p>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div class="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6"
             style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">预约流程</p>
          <div class="space-y-4">
            <div v-for="step in steps" :key="step.title" class="bg-surface-container-low rounded-2xl p-4">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary font-bold text-sm">
                  {{ step.id }}
                </div>
                <p class="font-semibold text-on-surface">{{ step.title }}</p>
              </div>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ step.body }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8"
             style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <template v-if="!submitted">
            <div class="space-y-8">
              <section>
                <div class="flex items-center justify-between gap-4 mb-4">
                  <h2 class="font-headline font-bold text-2xl text-on-surface">1. 选择咨询类型</h2>
                  <p v-if="errors.consultType" class="text-sm text-error">{{ errors.consultType }}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button v-for="option in consultOptions" :key="option.value"
                    @click="form.consultType = option.value"
                    class="text-left rounded-2xl p-5 transition-all border-2"
                    :class="form.consultType === option.value
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-surface-container-low border-transparent hover:border-primary/20'">
                    <p class="font-semibold mb-2">{{ option.label }}</p>
                    <p class="text-sm leading-relaxed"
                      :class="form.consultType === option.value ? 'text-white/80' : 'text-on-surface-variant'">
                      {{ option.desc }}
                    </p>
                  </button>
                </div>
              </section>

              <section>
                <div class="flex items-center justify-between gap-4 mb-4">
                  <h2 class="font-headline font-bold text-2xl text-on-surface">2. 选择时间段</h2>
                  <p v-if="errors.timeSlot" class="text-sm text-error">{{ errors.timeSlot }}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <button v-for="slot in timeSlots" :key="slot"
                    @click="form.timeSlot = slot"
                    class="rounded-xl px-4 py-4 font-medium transition-all border-2"
                    :class="form.timeSlot === slot
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-container-low border-transparent text-on-surface hover:border-outline-variant/40'">
                    {{ slot }}
                  </button>
                </div>
              </section>

              <section>
                <h2 class="font-headline font-bold text-2xl text-on-surface mb-4">3. 填写需求摘要</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label class="block">
                    <span class="block text-sm font-semibold text-on-surface mb-2">当前身份</span>
                    <input v-model="form.identity" type="text"
                      class="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-primary" />
                  </label>
                  <label class="block">
                    <span class="block text-sm font-semibold text-on-surface mb-2">目标方向</span>
                    <input v-model="form.goal" type="text"
                      class="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-primary" />
                  </label>
                </div>

                <label class="block">
                  <div class="flex items-center justify-between gap-4 mb-2">
                    <span class="block text-sm font-semibold text-on-surface">当前最大问题</span>
                    <span v-if="errors.summary" class="text-sm text-error">{{ errors.summary }}</span>
                  </div>
                  <textarea v-model="form.summary" rows="5"
                    class="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-primary resize-none"
                    placeholder="例如：科研经历较弱，想确认现在应该先补文献阅读、课题经历还是申请材料。"></textarea>
                </label>
              </section>
            </div>

            <div class="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-surface-container-high">
              <router-link to="/services"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-on-surface bg-surface-container-low hover:bg-surface-container-high transition-all">
                返回服务页
                <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              </router-link>
              <button @click="submitForm"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-white hover:opacity-90 transition-all">
                提交预约
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
              </button>
            </div>
          </template>

          <template v-else>
            <div class="blue-banner rounded-2xl p-8 text-white mb-6">
              <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Booking Received</p>
              <h2 class="font-headline font-bold text-3xl mb-3">预约信息已提交</h2>
              <p class="text-sm text-white/80 leading-relaxed">
                我们已收到你的预约信息。顾问会结合你的需求摘要，与你确认沟通时间和准备材料。
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="bg-surface-container-low rounded-2xl p-5">
                <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">咨询类型</p>
                <p class="font-semibold text-on-surface">{{ selectedConsultLabel }}</p>
              </div>
              <div class="bg-surface-container-low rounded-2xl p-5">
                <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">预约时间</p>
                <p class="font-semibold text-on-surface">{{ form.timeSlot }}</p>
              </div>
              <div class="bg-surface-container-low rounded-2xl p-5">
                <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">当前身份</p>
                <p class="font-semibold text-on-surface">{{ form.identity || '未填写' }}</p>
              </div>
              <div class="bg-surface-container-low rounded-2xl p-5">
                <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">目标方向</p>
                <p class="font-semibold text-on-surface">{{ form.goal || '未填写' }}</p>
              </div>
            </div>

            <div class="bg-surface-container-low rounded-2xl p-6 mb-8">
              <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">需求摘要</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ form.summary }}</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/assessment"
                class="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
                去做测评
                <span class="material-symbols-outlined text-[18px]">bolt</span>
              </router-link>
              <router-link to="/services"
                class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-6 py-3.5 rounded-xl font-bold hover:bg-surface-container-high transition-all">
                返回服务页
                <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              </router-link>
              <button @click="resetForm"
                class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-6 py-3.5 rounded-xl font-bold hover:bg-surface-container-high transition-all">
                重新填写
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import AppNav from '../components/AppNav.vue'

const consultOptions = [
  {
    value: 'single',
    label: '单次方向咨询',
    desc: '适合先用 60 分钟梳理方向、短板和近期任务。',
  },
  {
    value: 'startup',
    label: '科研启动包咨询',
    desc: '适合准备启动 3 个月训练，想确认服务内容和节奏的学生。',
  },
  {
    value: 'full',
    label: '全程陪跑咨询',
    desc: '适合申请周期较长，需要科研训练、资源匹配和材料推进同步管理的学生。',
  },
]

const timeSlots = [
  '周二 19:00 - 20:00',
  '周三 14:00 - 15:00',
  '周四 20:00 - 21:00',
  '周六 10:00 - 11:00',
  '周六 15:00 - 16:00',
  '周日 20:00 - 21:00',
]

const steps = [
  { id: '01', title: '选择咨询类型', body: '选择你最想解决的问题类型，方便顾问提前准备。' },
  { id: '02', title: '选择时间段', body: '选择你方便沟通的时间段，后续会进一步确认。' },
  { id: '03', title: '提交需求摘要', body: '填写身份、目标和当前困惑，让咨询更聚焦。' },
]

const initialForm = () => ({
  consultType: '',
  timeSlot: '',
  identity: '',
  goal: '',
  summary: '',
})

const form = reactive(initialForm())
const errors = reactive({
  consultType: '',
  timeSlot: '',
  summary: '',
})
const submitted = ref(false)

const selectedConsultLabel = computed(() =>
  consultOptions.find((item) => item.value === form.consultType)?.label ?? '未选择'
)

function resetErrors() {
  errors.consultType = ''
  errors.timeSlot = ''
  errors.summary = ''
}

function submitForm() {
  resetErrors()

  if (!form.consultType) errors.consultType = '请选择咨询类型'
  if (!form.timeSlot) errors.timeSlot = '请选择时间段'
  if (!form.summary.trim()) errors.summary = '请填写需求摘要'

  if (errors.consultType || errors.timeSlot || errors.summary) return

  submitted.value = true
}

function resetForm() {
  Object.assign(form, initialForm())
  resetErrors()
  submitted.value = false
}
</script>
