<script setup lang='ts'>
// import { useThemeStore } from '../../../src/stores/theme'
import { createHighlighter } from 'shiki'
import { nextTick, onMounted, ref, watch } from 'vue'
import litemath from '../data/litemath'

const content = defineModel<string>()
const rendered = ref<string>()
// const { theme } = useThemeStore()

const editor = ref<HTMLTextAreaElement>()
const preview = ref<HTMLDivElement>()

let highlighter: Awaited<ReturnType<typeof createHighlighter>>

function syncScroll() {
  const e = editor.value!
  const p = preview.value!
  p.scrollTop = e.scrollTop
  p.scrollLeft = e.scrollLeft
}

function render(code: string = '') {
  rendered.value = highlighter.codeToHtml(code, {
    lang: 'litemath',
    theme: `vitesse-dark`,
    transformers: [{
      preprocess(code) {
        // Workaround for https://github.com/shikijs/shiki/issues/608
        // When last span is empty, it's height is 0px
        // so add a newline to render it correctly
        if (code.endsWith('\n'))
          return `${code}\n`
      },
    }],
  })
}

onMounted(async () => {
  highlighter = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: ['markdown', litemath],
  })

  watch(content, () => {
    render(content.value)
    nextTick(syncScroll)
  }, { immediate: true })

  // watch(theme, () => {
  //   render(content.value)
  //   nextTick(syncScroll)
  // })
})
</script>

<template>
  <div
    relative h-40 rd-2 b="1px #8888 dashed"
    class="demo-markdown-wrapper"
  >
    <div
      ref="preview" overflow-auto w-full h-full z-10
      box-border pointer-events-none p-4 text-3.2
    >
      <span
        children-m-0 class="demo-markdown-mock"
        v-html="rendered"
      />
    </div>
    <textarea
      ref="editor" v-model="content"
      b-0 focus:outline-none text-3.2
      whitespace-pre inset-0 outline-0 resize-none
      bg-transparent caret-gray tab-4
      z-5 p-4 text-transparent autocomplete="off"
      autocorrect="off" autocapitalize="off"
      spellcheck="false" @scroll="syncScroll()"
    />
  </div>
</template>

<style>
.demo-markdown-mock button.markdown-copy-code-button {
  display: none;
}

.demo-markdown-wrapper>* {
  line-height: 1.8;
  position: absolute;
}

.demo-markdown-mock * {
  background-color: transparent !important;
}
</style>
