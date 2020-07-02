<template>
  <div class="ql-container ql-snow">
    <div
      class="editor"
      ref="quillEditor"
      id="quill-editor"
      @change="change"
    ></div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: 'Quill',

  // props: {
  //   sectionContent: {
  //     type: Object,
  //     default: () => {},
  //   },
  // },

  data() {
    return {
      quill: '',
      options: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }],
            ['bold'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        },
        placeholder: 'Insert text here ...',
      },
    }
  },

  mounted() {
    let editorContainer = this.$refs.quillEditor
    this.quill = new Quill(editorContainer, this.options)
    this.quill.setText(this.sectionContent)

    // this.quill.on('content-change', () => {
    //   this.$emit('input', this.quill.getContents())
    // })
    console.log(this.quill)
  },

  methods: {
    change(e) {
      console.log('change -> e', e)
    },
  },
}
</script>

<style lang="less" scoped>
.ql-snow {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  padding: 0 !important;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
.editor {
  height: 300px;
}
</style>
