/**
 * Theme: Powerx - Responsive Bootstrap 5 Admin Dashboard
 * Author: Coderthemes
 * Module/App: Layout Js
 */

import type { ModeEnum } from './ModeEnum'
import { useThemeStore } from './store'

class ThemeCustomizer {
  constructor(private store) {
    this.html = document.getElementsByTagName('html')[0]
    this.config = {}
    this.defaultConfig = this.store.$state
  }

  initConfig() {
    // this.defaultConfig = JSON.parse(JSON.stringify(window.defaultConfig))
    this.defaultConfig = JSON.parse(JSON.stringify(this.store.$state))
    // this.config = JSON.parse(JSON.stringify(window.config))
    this.config = JSON.parse(JSON.stringify(this.store.$state))
    this.setSwitchFromConfig()
  }

  changeMenuColor(color) {
    this.config.menu.color = color
    this.html.setAttribute('data-menu-color', color)
    this.setSwitchFromConfig()
  }

  changeLeftbarSize(size: string, save: boolean = true): void {
    this.html.setAttribute('data-sidenav-size', size)
    // if (save) {
    this.store.changeSidenavSize(size)
    this.setSwitchFromConfig()
    // }
  }

  changeLayoutPosition(position) {
    this.config.layout.position = position
    this.html.setAttribute('data-layout-position', position)
    this.setSwitchFromConfig()
  }

  changeLayoutColor(mode: string): void {
    // this.config.theme = color
    this.html.setAttribute('data-bs-theme', mode)
    // this.setSwitchFromConfig()
  }

  menuToggleButton(): void {
    var configSize = this.config.sidenav.size
    var size = this.html.getAttribute('data-sidenav-size', configSize)

    if (size === 'full') {
      this.showBackdrop()
    } else {
      if (configSize == 'fullscreen') {
        if (size === 'fullscreen') {
          this.changeLeftbarSize(configSize == 'fullscreen' ? 'default' : configSize, false)
        } else {
          this.changeLeftbarSize('fullscreen', false)
        }
      } else {
        if (size === 'condensed') {
          this.changeLeftbarSize(configSize == 'condensed' ? 'default' : configSize, false)
        } else {
          this.changeLeftbarSize('condensed', false)
        }
      }
    }

    // Todo: old implementation
    this.html.classList.toggle('sidebar-enable')
  }

  changeTopbarColor(color) {
    this.config.topbar.color = color
    this.html.setAttribute('data-topbar-color', color)
    this.setSwitchFromConfig()
  }

  changeSidebarUser(showUser) {
    this.config.sidenav.user = showUser
    if (showUser) {
      this.html.setAttribute('data-sidenav-user', showUser)
    } else {
      this.html.removeAttribute('data-sidenav-user')
    }
    this.setSwitchFromConfig()
  }

  resetTheme() {
    this.config = JSON.parse(JSON.stringify(window.defaultConfig))
    this.changeMenuColor(this.config.menu.color)
    this.changeLeftbarSize(this.config.sidenav.size)
    this.changeLayoutColor(this.config.mode)
    this.changeLayoutPosition(this.config.layout.position)
    this.changeTopbarColor(this.config.topbar.color)
    this.changeSidebarUser(this.config.sidenav.user)
    this._adjustLayout()
  }

  initSwitchListener() {
    var self = this
    document.querySelectorAll('input[name=data-menu-color]').forEach(function (element) {
      element.addEventListener('change', function (e) {
        self.changeMenuColor(element.value)
      })
    })

    document.querySelectorAll('input[name=data-sidenav-size]').forEach(function (element) {
      element.addEventListener('change', function (e) {
        self.changeLeftbarSize(element.value)
      })
    })

    document.querySelectorAll('input[name=data-bs-theme]').forEach(function (element) {
      element.addEventListener('change', function (e) {
        self.changeLayoutColor(element.value)
      })
    })

    document.querySelectorAll('input[name=data-layout-position]').forEach(function (element) {
      element.addEventListener('change', function (e) {
        self.changeLayoutPosition(element.value)
      })
    })
    document.querySelectorAll('input[name=data-topbar-color]').forEach(function (element) {
      element.addEventListener('change', function (e) {
        self.changeTopbarColor(element.value)
      })
    })
    document.querySelectorAll('input[name=sidebar-user]').forEach(function (element) {
      element.addEventListener('change', function (e) {
        self.changeSidebarUser(element.checked)
      })
    })

    //TopBar Light Dark
    // var themeColorToggle = document.getElementById('light-dark-mode')
    // if (themeColorToggle) {
    //   themeColorToggle.addEventListener('click', function (e) {
    //     if (self.config.theme === 'light') {
    //       self.changeLayoutColor('dark')
    //     } else {
    //       self.changeLayoutColor('light')
    //     }
    //   })
    // }

    self.changeLayoutColor(this.store.mode)

    var resetBtn = document.querySelector('#reset-layout')
    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        self.resetTheme()
      })
    }

    // self.menuToggleButton()

    // var menuToggleBtn = document.querySelector('.button-toggle-menu')
    // if (menuToggleBtn) {
    //   menuToggleBtn.addEventListener('click', function () {
    //     var configSize = self.config.sidenav.size
    //     var size = self.html.getAttribute('data-sidenav-size', configSize)

    //     if (size === 'full') {
    //       self.showBackdrop()
    //     } else {
    //       if (configSize == 'fullscreen') {
    //         if (size === 'fullscreen') {
    //           self.changeLeftbarSize(configSize == 'fullscreen' ? 'default' : configSize, false)
    //         } else {
    //           self.changeLeftbarSize('fullscreen', false)
    //         }
    //       } else {
    //         if (size === 'condensed') {
    //           self.changeLeftbarSize(configSize == 'condensed' ? 'default' : configSize, false)
    //         } else {
    //           self.changeLeftbarSize('condensed', false)
    //         }
    //       }
    //     }

    //     // Todo: old implementation
    //     self.html.classList.toggle('sidebar-enable')
    //   })
    // }

    var menuCloseBtn = document.querySelector('.button-close-fullsidebar')
    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', function () {
        self.html.classList.remove('sidebar-enable')
        self.hideBackdrop()
      })
    }
  }

  public lightDarkMode() {
    const mode = this.store.mode === 'light' ? 'dark' : 'light'

    this.store.changeMode(mode)
    this.changeLayoutColor(mode)
    this.setSwitchFromConfig()
  }

  showBackdrop() {
    const backdrop = document.createElement('div')
    backdrop.id = 'custom-backdrop'
    backdrop.classList = 'offcanvas-backdrop fade show'
    document.body.appendChild(backdrop)
    document.body.style.overflow = 'hidden'
    if (window.innerWidth > 767) {
      document.body.style.paddingRight = '15px'
    }
    const self = this
    backdrop.addEventListener('click', function (e) {
      self.html.classList.remove('sidebar-enable')
      self.hideBackdrop()
    })
  }

  hideBackdrop() {
    var backdrop = document.getElementById('custom-backdrop')
    if (backdrop) {
      document.body.removeChild(backdrop)
      document.body.style.overflow = null
      document.body.style.paddingRight = null
    }
  }

  initWindowSize() {
    var self = this
    window.addEventListener('resize', function (e) {
      self._adjustLayout()
    })
  }

  _adjustLayout() {
    var self = this

    if (window.innerWidth <= 767.98) {
      self.changeLeftbarSize('full', false)
    } else if (window.innerWidth >= 767 && window.innerWidth <= 1140) {
      if (self.config.sidenav.size !== 'full' && self.config.sidenav.size !== 'fullscreen') {
        if (self.config.sidenav.size === 'sm-hover') {
          self.changeLeftbarSize('condensed')
        } else {
          self.changeLeftbarSize('condensed', false)
        }
      }
    } else {
      self.changeLeftbarSize(self.config.sidenav.size)
    }
  }

  setSwitchFromConfig() {
    sessionStorage.setItem('__POWERX_CONFIG__', JSON.stringify(this.store.$state))
    localStorage.setItem('__POWERX_CONFIG__', JSON.stringify(this.store.$state))
    // console.log('__POWERX_CONFIG__', this.store.$state)
    // localStorage.setItem('__POWERX_CONFIG__', JSON.stringify(this.config));

    document
      .querySelectorAll('#theme-settings-offcanvas input[type=checkbox]')
      .forEach(function (checkbox) {
        checkbox.checked = false
      })

    var config = this.store.$state

    if (config) {
      var layoutColorSwitch = document.querySelector(
        'input[type=checkbox][name=data-bs-theme][value=' + config.mode + ']',
      )
      var topbarColorSwitch = document.querySelector(
        'input[type=checkbox][name=data-topbar-color][value=' + config.topbar.color + ']',
      )
      var menuColorSwitch = document.querySelector(
        'input[type=checkbox][name=data-menu-color][value=' + config.menu.color + ']',
      )
      var leftbarSizeSwitch = document.querySelector(
        'input[type=checkbox][name=data-sidenav-size][value=' + config.sidenav.size + ']',
      )
      var layoutPositionSwitch = document.querySelector(
        'input[type=radio][name=data-layout-position][value=' + config.layout.position + ']',
      )
      var sidebarUserSwitch = document.querySelector('input[type=checkbox][name=sidebar-user]')

      if (layoutColorSwitch) layoutColorSwitch.checked = true
      if (topbarColorSwitch) topbarColorSwitch.checked = true
      if (menuColorSwitch) menuColorSwitch.checked = true
      if (leftbarSizeSwitch) leftbarSizeSwitch.checked = true
      if (layoutPositionSwitch) layoutPositionSwitch.checked = true
      if (sidebarUserSwitch && config.sidenav.user.toString() === 'true')
        sidebarUserSwitch.checked = true
    }
  }

  public init() {
    console.log('Init')
    this.initConfig()
    this.initSwitchListener()
    this.initWindowSize()
    this._adjustLayout()
    this.setSwitchFromConfig()

    return this
  }
}

export default new ThemeCustomizer(useThemeStore()).init()

// const themeCustomizer = new ThemeCustomizer(useThemeStore())
// themeCustomizer.init()
