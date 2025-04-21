import { defineExtension, useCommand } from 'reactive-vscode'
import { Panel } from './panel'

const DEFAULT_TEX = '\\mathrm{E=mc^2}'

const { activate, deactivate } = defineExtension((context) => {
  useCommand('mathjax-webview.show', (tex: string = DEFAULT_TEX) => {
    const panel = Panel.singleton(context)
    panel.post(tex)
  })
})

export { activate, deactivate }
