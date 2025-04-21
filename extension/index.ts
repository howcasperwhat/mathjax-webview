import { defineExtension, useActiveTextEditor, useCommand, useTextEditorSelection } from 'reactive-vscode'
import { commands, window } from 'vscode'
import { ViewProvider } from './view'

const { activate, deactivate } = defineExtension(async (context) => {
  const provider = new ViewProvider(context)
  context.subscriptions.push(
    window.registerWebviewViewProvider(ViewProvider.viewType, provider),
  )

  const editor = useActiveTextEditor()
  const selection = useTextEditorSelection(editor)

  // Command to show/update the preview in the view
  useCommand('mathjax-webview.show', async (tex?: string) => {
    const currentProvider = ViewProvider.getInstance()
    const textToSend = tex ?? editor.value?.document.getText(selection.value) ?? ''

    if (currentProvider) {
      currentProvider.post(textToSend)
      currentProvider.reveal() // Ensure the view is visible
    }
    else {
      // If provider doesn't exist yet, reveal the view first.
      // Revealing should trigger resolveWebviewView and create the instance.
      try {
        await commands.executeCommand('workbench.view.extension.mathjax-preview-container')
        await commands.executeCommand(`${ViewProvider.viewType}.focus`)
        // Give a brief moment for the view to potentially resolve, then set message
        // A more robust solution might involve waiting for a confirmation message from the webview
        setTimeout(() => {
          ViewProvider.getInstance()?.setMessage(textToSend)
        }, 100) // Adjust delay if needed
      }
      catch {
        window.showErrorMessage('Could not reveal or update the MathJax Preview view.')
      }
    }
  })

  // Optional: Command to just reveal the view if needed elsewhere
  useCommand('mathjax-webview.reveal', () => {
    ViewProvider.getInstance()?.reveal()
  })
})

export { activate, deactivate }
