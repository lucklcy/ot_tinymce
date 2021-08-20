<template>
  <div class="tiny-mce-editor-wrap">
    <div class="custom-cursor" :style="customCursor"></div>
    <editor v-model="content" :init="init" :id="id"></editor>
    <div class="operation">
      <div class="set-cursor">
        <input type="text" v-model="position" />
        <Btn @click="setCursorAtAsync">setCursorAt</Btn>
        <Btn @click="getCursorAsync">getCursor</Btn>
        <span class="text">
          current cursor position: <i>{{ currentCursorPosition }}</i>
        </span>
      </div>
      <Btn :disabled="true">countDown : {{ `${countDown}s` }}</Btn>
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

const INITIAL_COUNT_DOWN = 5
export default {
  name: 'self-tinymce',
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
      content:
        '<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong>近日</strong></span>，教育部官网公布了<strong><span style="color: #34495e;">《对十三届全国人大四次会议<span style="text-decoration: underline;"><em>第4114号</em></span>建议的答复》</span></strong>，其中提到，新一轮&ldquo;双一流&rdquo;建设，按照&ldquo;以需求为导向、<span style="color: #003a54;">以学科为基础</span>、以比选为手段、确保平稳推进&rdquo;的路径进行调整认定，<strong><span style="color: #e03e2d;">不搞平衡照顾</span></strong>。</p>\n<p>&nbsp; &nbsp; &nbsp; <em><span style="color: #003a54; font-size: 18px;"><strong>早在去年9月27日</strong></span></em>，教育部官网在《关于政协十三届全国委员会第三次会议第4829号（教育类377号）提案答复》中就已明确，&ldquo;双一流&rdquo;首轮建设2020年结束，将根据期末建设成效评价结果等情况，坚持质量、水平与需求相统一，动态调整下一轮建设范围。<strong><span style="color: #e03e2d;">不搞全覆盖，不搞终身制，不搞安排照顾</span></strong>。</p>\n<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong><span style="color: #34495e;">上述文件中指出</span></strong></span>，党中央、国务院提出实施&ldquo;双一流&rdquo;建设战略，将<strong><span style="color: #e67e23;">&ldquo;211工程&rdquo;、&ldquo;985工程&rdquo;</span></strong>、&ldquo;高等学校创新能力提升计划&rdquo;等重点建设项目统筹纳入&ldquo;双一流&rdquo;建设，<span style="text-decoration: underline; color: #e67e23;"><em>打破建设身份固化、竞争缺失的弊端、建立分类建设特色化质量发展的新建设模式</em></span>。</p>\n<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong><span style="color: #34495e;">文件同时提出</span></strong></span>：<strong><span style="color: #843fa1;">将在科技平台基地建设布局中加大对地方高校的倾斜</span></strong>。邀请地方教育行政主管部门和部分地方高校参加全国高校科技工作会、高校科技工作专题培训；支持地方高校根据自身发展需求，<span style="color: #3598db;"><em>整合创新资源，建设各类国家级、省部级</em></span>、<strong><span style="color: #169179;">校级科技创新平台</span></strong>。</p>\n<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong>将通过部省合建</strong></span>、对口支援、专项工作等多种途径加大对河北省学科建设的指导，支持其积极服务区域经济社会发展，增强优势特色。进一步发挥京津冀高校科技创新整体优势，<strong><span style="background-color: #c2e0f4; color: #843fa1; font-size: 18px;">鼓励<em>京津冀高校建立科</em>研合作关系</span></strong>。</p>',
      countDown: INITIAL_COUNT_DOWN,
      position: '',
      currentCursorPosition: -1,
      customCursor: {}
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
      if (--countDown > 0) {
        Object.assign(this, { countDown })
        setTimeout(this.updateContent, 1000)
      } else {
        Object.assign(this, { countDown })
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
    util() {
      const instance = tinymce.get(this.id)
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      // const { instance, root, TreeWalker } = util
      return { instance, root, TreeWalker }
    },
    countDownReset() {
      Object.assign(this, { countDown: INITIAL_COUNT_DOWN })
    },
    setCursorAt() {
      let { id, position } = this
      position = parseInt(position)
      const instance = tinymce.get(id)
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      let walker = new TreeWalker(root)
      const rootTextContent = root.textContent
      console.log('rootTextContent.length:', rootTextContent.length, ' --- position:', position)
      if (rootTextContent.length < position) position = rootTextContent.length
      let [continueFlag, tempTextContent, prevPosition] = [true, '', 0]
      do {
        let currnetNode = walker.current()
        let offset = 0
        if (currnetNode.nodeName === '#text') {
          tempTextContent += currnetNode.textContent
          if (tempTextContent.length >= position) {
            if (tempTextContent.length > position) offset = position - prevPosition
            console.log('tempTextContent:', tempTextContent)
            console.log('currnetNode:', currnetNode, ' --- tempTextContent.length:', tempTextContent.length, ' --- offset:', offset)
            instance.selection.setCursorLocation(currnetNode, offset)
            continueFlag = false
          } else {
            prevPosition = tempTextContent.length
          }
        }
      } while (walker.next() && continueFlag)
      this.countDownReset()
    },
    setCursorAtAsync() {
      let { countDown } = this
      if (--countDown > 0) {
        Object.assign(this, { countDown })
        setTimeout(this.setCursorAtAsync, 1000)
      } else {
        Object.assign(this, { countDown })
        this.setCursorAt()
      }
    },
    getCursor() {
      let { id } = this
      const instance = tinymce.get(id)
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      let walker = new TreeWalker(root)
      let range = instance.selection.getRng()
      let { startContainer, startOffset } = range
      console.log('current range:', range)
      console.log('startContainer:', startContainer, ' --- startOffset:', startOffset)
      let [continueFlag, tempTextContent, prevNode] = [true, '', null]
      do {
        let currnetNode = walker.current()
        if (currnetNode === startContainer) {
          if (prevNode) {
            let prevNodeRect = instance.dom.getRect(prevNode)
            console.log('prevNode:', prevNode)
            console.log('prevNodeRect:', prevNodeRect)
            Object.assign(this, {
              customCursor: {
                left: `${prevNodeRect.x + prevNodeRect.w + 16 * startContainer.startOffset}px`,
                top: `${prevNodeRect.y + 117 + 4}px`
              }
            })
          }
          let currentCursorPosition = tempTextContent.length + startOffset
          console.log('currnetNode', currnetNode, 'currentCursorPosition:', currentCursorPosition)
          Object.assign(this, { currentCursorPosition })
          continueFlag = false
        } else {
          if (currnetNode.nodeName === '#text') {
            tempTextContent += currnetNode.textContent
          } else {
            prevNode = currnetNode
          }
        }
      } while (walker.next() && continueFlag)
      this.countDownReset()
    },
    getCursorAsync() {
      let { countDown } = this
      if (--countDown > 0) {
        Object.assign(this, { countDown })
        setTimeout(this.getCursorAsync, 1000)
      } else {
        Object.assign(this, { countDown })
        this.getCursor()
      }
    }
  },
  created() {},
  mounted() {
    tinymce.init({}) // 这里传个空对象就可以了
    setTimeout(() => (window.util = this.util()), 2000)
  }
}
</script>
<style lang="less" scoped>
.tiny-mce-editor-wrap {
  position: relative;
  background-color: #fff;
  .custom-cursor {
    position: absolute;
    z-index: 2;
    height: 20px;
    width: 3px;
    background-color: blue;
    border-radius: 4px;
    top: 10px;
    left: 8px;
    @keyframes step-run {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    transform: scalex(0.5);
    animation: step-run 1s steps(1, end) 0s infinite backwards;
  }
  .operation {
    padding: 20px 0;
    .setFlexPos(row, center, center);
    .set-cursor {
      margin: 20px;
      border-right: 1px dashed #666;
      .setFlexPos(row, center, center);
      padding: 0 12px 0 0;
      input {
        margin: 0 12px 0 0;
        border: 1px solid blue;
        display: inline-block;
        width: 60px;
        padding: 4px 10px;
        color: rgb(54, 54, 54);
        font-size: 14px;
        border-radius: 4px;
      }
      .text {
        color: rgb(54, 54, 54);
        i {
          margin: 0 8px;
          color: orange;
          display: inline-block;
          font-style: normal;
          border-bottom: 1px solid orange;
          padding: 2px 0;
        }
      }
    }
  }
}
</style>
