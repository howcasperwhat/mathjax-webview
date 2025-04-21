import { defineExtension, useActiveTextEditor, useCommand, useTextEditorSelection } from 'reactive-vscode'
import { Panel } from './panel'

const { activate, deactivate } = defineExtension(async (context) => {
  const editor = useActiveTextEditor()
  const selection = useTextEditorSelection(editor)
  useCommand('mathjax-webview.show', async (tex?: string) => {
    const panel = Panel.singleton(context)
    panel.post(tex ?? editor.value?.document.getText(selection.value) ?? '')
  })
})

export { activate, deactivate }
