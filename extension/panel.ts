import type { ExtensionContext, WebviewPanel } from 'vscode'
import { ViewColumn, window } from 'vscode'
import * as config from './generated/meta'

export class Panel {
  private static instance?: Panel

  public static singleton(context: ExtensionContext): Panel {
    return (Panel.instance ??= new Panel(context))
  }

  private panel: WebviewPanel

  private constructor(context: ExtensionContext) {
    this.panel = window.createWebviewPanel(
      config.name,
      config.displayName,
      ViewColumn.One,
      { enableScripts: true },
    )
    this.panel.webview.html = __getWebviewHtml__({
      // DO NOT FIX THIS!
      // eslint-disable-next-line node/prefer-global/process
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview: this.panel.webview,
      context,
    })
    this.panel.webview.onDidReceiveMessage(
      message => window.showInformationMessage(message.data),
      undefined,
      context.subscriptions,
    )
    this.panel.onDidDispose(() => {
      Panel.instance = undefined
    }, null, context.subscriptions)
  }

  public render(tex: string) {
    this.panel.reveal(ViewColumn.One)
    this.panel.webview.postMessage({
      type: config.name,
      data: tex,
    })
  }
}
