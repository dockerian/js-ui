import Vue from 'vue'
import Notification from '@/components/app/Notification'
import iView from 'iview'

Vue.use(iView)

describe('app/Notification.vue', () => {
  it('should render Notification contents', () => {
    const Constructor = Vue.extend(Notification)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
