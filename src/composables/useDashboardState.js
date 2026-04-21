import { computed, reactive } from 'vue'
import { dashboardMessages } from '../data/dashboard.js'

const messageState = reactive(
  dashboardMessages.map((item) => ({ ...item }))
)

export function useDashboardState() {
  const unreadCount = computed(() =>
    messageState.filter((item) => item.unread).length
  )

  function markAllMessagesRead() {
    messageState.forEach((item) => {
      item.unread = false
    })
  }

  function selectMessage(id) {
    const message = messageState.find((item) => item.id === id)
    if (message) {
      message.unread = false
    }
  }

  return {
    messages: messageState,
    unreadCount,
    markAllMessagesRead,
    selectMessage,
  }
}
