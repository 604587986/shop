<template>
  <div>
    <script :id="randomId" type="text/plain"></script>
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
        /** 编辑器实例 */
        editor: null,

        /** 每个编辑器生成不同的id,以防止冲突 */
        randomId: 'editor_1' + parseInt(Math.random() * 10000 + 1),

        ready: false
      }
    },
    props: {
      defaultMsg: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: () => ({
          serverUrl: `${process.env.BASE_API}/ueditor/`
        })
      }
    },
    watch: {
      defaultMsg(newVal, oldVal) {
        if (newVal != null && this.ready) {
          this.editor.setContent(newVal || '')
        }
      }
    },
    mounted() {
      this.initEditor()
    },
    methods: {
      /** 初始化编辑器 */
      initEditor() {
        this.$nextTick(() => {
          this.editor = window.UE.getEditor(this.randomId, this.config)
          this.editor.addListener('ready', () => {
            this.ready = true
            this.editor.setContent(this.defaultMsg)
          })
        })
      },

      getUEContent() {
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy()
    }
  }
</script>
