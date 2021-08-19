<template>
  <div class="tiny-mce-editor-wrap">
    <editor v-model="content" :init="init" :id="id"></editor>
    <div class="operation">
      <Btn @click="updateContent">auto update : {{ `${countDown.updateContent}s` }}</Btn>
      <Btn @click="showBookMark">bookmark : {{ `${countDown.showBookMark}s` }}</Btn>
    </div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import Btn from '~/base/btn'
import 'tinymce/themes/silver'
// 引入图标库
import 'tinymce/icons/default/icons'
// 引入插件
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/template'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'

const INITIAL_COUNT_DOWN = 8
export default {
  props: {
    id: {
      type: String,
      default: 'default'
    },
    value: {
      type: String,
      default: ''
    },
    // 默认插件 这里写的比较全，基本上是全部了
    plugins: {
      type: [String, Array],
      default:
        'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern autosave autoresize'
    },
    // 默认工具栏 这里写的比较全，基本上是全部了
    toolbar: {
      type: [String, Array],
      default:
        'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent lineheight formatpainter | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap hr pagebreak insertdatetime | bdmap fullscreen preview'
    }
  },
  data() {
    return {
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js', // 中文语言包路径
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 770,
        min_height: 770,
        max_height: 770,
        toolbar_mode: 'wrap',
        plugins: this.plugins,
        toolbar: this.toolbar,
        content_style: 'p {margin: 5px 0;}',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        branding: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      content: '',
      countDown: {
        updateContent: INITIAL_COUNT_DOWN,
        showBookMark: INITIAL_COUNT_DOWN
      }
    }
  },
  components: {
    editor: Editor,
    Btn
  },
  watch: {},
  methods: {
    updateContent() {
      let { id, countDown } = this
      if (--countDown.updateContent > 0) {
        Object.assign(this.countDown, countDown)
        setTimeout(this.updateContent, 1000)
      } else {
        Object.assign(this.countDown, { updateContent: INITIAL_COUNT_DOWN })
        const instance = tinymce.get(id)
        const bookmark = instance.selection.getBookmark(2)
        console.log('bookmark', bookmark)
        // instance.setContent(instance.getContent() + 'Some new content')
        let oldContent = instance.getContent()
        instance.setContent(`${oldContent.substring(0, 10)}<span class="custom-cursor" data-flag="1">&zwnj;</span>${oldContent.substring(10)}`)
        // instance.setContent(`${oldContent.substring(0, 10)}撒懒得看发送的看法${oldContent.substring(10)}`)
        // instance.setContent('Somthing new!!')
        instance.selection.moveToBookmark(bookmark)
      }
    },
    showBookMark() {
      let { id, countDown } = this
      if (--countDown.showBookMark > 0) {
        Object.assign(this.countDown, countDown)
        setTimeout(this.showBookMark, 1000)
      } else {
        Object.assign(this.countDown, { showBookMark: INITIAL_COUNT_DOWN })
        const instance = tinymce.get(id)
        const bookmark = instance.selection.getBookmark(2)
        console.log('bookmark', bookmark)
      }
    }
  },
  created() {},
  mounted() {
    tinymce.init({}) // 这里传个空对象就可以了
  }
}
</script>
<style lang="less" scoped>
.tiny-mce-editor-wrap {
  background-color: #fff;
  .operation {
    padding: 20px 0;
    .setFlexPos(row, center, center);
  }
}
</style>
