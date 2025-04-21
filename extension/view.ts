import type {
  CancellationToken,
  ExtensionContext,
  WebviewView,
  WebviewViewProvider,
} from 'vscode'
import { commands, window } from 'vscode'
import * as config from './generated/meta'

export class ViewProvider implements WebviewViewProvider {
  public static readonly viewType = 'mathjax-webview'

  private view?: WebviewView
  private context: ExtensionContext
  private isReady: boolean = false
  private message: string = ''

  private static instance?: ViewProvider

  constructor(context: ExtensionContext) {
    this.context = context
    ViewProvider.instance = this
  }

  public static getInstance(): ViewProvider | undefined {
    return ViewProvider.instance
  }

  public resolveWebviewView(
    webviewView: WebviewView,
    _: any, // WebviewViewResolveContext
    _token: CancellationToken,
  ) {
    this.view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    }

    webviewView.webview.html = __getWebviewHtml__({
      // eslint-disable-next-line node/prefer-global/process
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview: webviewView.webview,
      context: this.context,
    })

    webviewView.webview.onDidReceiveMessage(
      (message) => {
        if (message.type === config.name) {
          this.isReady = true
          if (this.message) {
            this.post(this.message)
          }
        }
      },
      undefined,
      this.context.subscriptions,
    )

    webviewView.onDidDispose(() => {
      this.view = undefined
      this.isReady = false
    }, null, this.context.subscriptions)
  }

  public post(data: string) {
    this.message = data
    if (this.view && this.isReady) {
      this.view.webview.postMessage({
        type: config.name,
        data: this.message,
      })
    }
  }

  public reveal() {
    if (this.view) {
      this.view.show?.(true)
    }
    else {
      try {
        Promise.resolve()
          .then(() => commands.executeCommand(`workbench.view.extension.mathjax-webview-container`))
          .then(() => commands.executeCommand(`${ViewProvider.viewType}.focus`))
      }
      catch (error) {
        window.showErrorMessage(`${error}`)
      }
    }
  }

  // Method to initialize the view with a message, useful if called before resolveWebviewView
  public setMessage(message: string) {
    this.message = message
    // If view is already ready, post immediately
    if (this.view && this.isReady) {
      this.post(this.message)
    }
  }
}
