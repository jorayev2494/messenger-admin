import { defineStore } from 'pinia'

interface StateInterface {
  mode: string
  layout: {
    position: string
  }
  topbar: {
    color: string
  }
  menu: {
    color: string
  }
  sidenav: {
    size: string
    user: boolean
  }
}

const defaultState: StateInterface = {
  mode: 'light', // 'dark',
  layout: {
    position: 'fixed',
  },
  topbar: {
    color: 'light',
  },
  menu: {
    color: 'light',
  },
  sidenav: {
    size: 'default',
    user: !1,
  },
}

const loadState = (): StateInterface => {
  // const c = sessionStorage.getItem('__POWERX_CONFIG__')
  // return defaultState

  const c: string | null = localStorage.getItem('__POWERX_CONFIG__')

  return c !== null ? JSON.parse(c) : defaultState
}

export const useThemeStore = defineStore('theme', {
  state: (): StateInterface => ({
    ...loadState(),
  }),
  getters: {},
  actions: {
    changeMode(state: string): void {
      this.mode = state
    },
    changeSidenavSize(size: string): void {
      this.sidenav.size = size
      console.log('changeSidenavSize: ', this.sidenav)
    },
  },
})
