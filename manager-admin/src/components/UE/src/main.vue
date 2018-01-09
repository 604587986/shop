<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
  import '../../../../static/UE/ueditor.config'
  import '../../../../static/UE/ueditor.all'
  import '../../../../static/UE/lang/zh-cn/zh-cn'
  import '../../../../static/UE/ueditor.parse'
  export default {
    name: 'UE',
    data() {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    watch: {
      defaultMsg(newVal, oldVal) {
        this.editor.setContent(newVal || '')
      }
    },
    mounted() {
      this.editor = window.UE.getEditor('editor', this.config)
      this.editor.addListener('ready', () => {
        this.editor.setContent(this.defaultMsg)
      })
    },
    methods: {
      getUEContent() {
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy()
    }
  }
</script>
