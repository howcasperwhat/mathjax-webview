import type { ExtensionContext, WebviewPanel } from 'vscode'
import { ViewColumn, window } from 'vscode'
import * as config from './generated/meta'

export class Panel {
  private static instance?: Panel
  public static singleton(context: ExtensionContext, message?: string): Panel {
    return (Panel.instance ??= new Panel(context, message)).render()
  }

  private isReady: boolean = false
  private panel: WebviewPanel
  private message: string = ''

  private constructor(context: ExtensionContext, message?: string) {
    this.message = message ?? ''
    this.panel = window.createWebviewPanel(
      config.name,
      config.displayName,
      ViewColumn.One,
      { enableScripts: true },
    )
    this.panel.webview.html = __getWebviewHtml__({
      // eslint-disable-next-line node/prefer-global/process
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview: this.panel.webview,
      context,
    })
    this.panel.webview.onDidReceiveMessage(
      (message) => {
        if (message.type === config.name) {
          this.isReady = true
          this.post(this.message)
        }
      },
      undefined,
      context.subscriptions,
    )
    this.panel.onDidDispose(() => {
      Panel.instance = undefined
    }, null, context.subscriptions)
  }

  public post(data: string) {
    this.message = data
    this.isReady && this.panel.webview.postMessage({
      type: config.name,
      data: this.message,
    })
  }

  private render() {
    this.panel.reveal(ViewColumn.One)
    return this
  }
}
