import Vue from 'vue'
import MessageBoard from '@/components/app/MessageBoard'
import iView from 'iview'

Vue.use(iView)

describe('app/MessageBoard.vue', () => {
  it('should render MessageBoard contents', () => {
    const Constructor = Vue.extend(MessageBoard)
    const vm = new Constructor().$mount()
    expect(vm).not.toBeNull()
  })
})
