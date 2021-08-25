<template>
  <div class="tiny-mce-editor-wrap">
    <div class="custom-cursor"></div>
    <editor v-model="content" :init="init" :id="id"></editor>
    <div class="display">
      <Btn :disabled="true">countDown : {{ `${countDown}s` }}</Btn>
    </div>
    <hr />
    <div class="container">
      <ul class="content first">
        <li>
          <Btn @click="asyncDo('updateContent')">updateContent</Btn>
        </li>
      </ul>
      <ul class="content second">
        <li>
          <input type="text" v-model="position" />
          <Btn @click="asyncDo('setCursorAt')">setCursorAt</Btn>
        </li>
        <li>
          <Btn @click="asyncDo('getCursor')">getCursor</Btn>
          <span class="text">
            current cursor position: <i>{{ currentCursorPosition }}</i>
          </span>
        </li>
      </ul>
      <ul class="content third">
        <li>
          start&nbsp;:&nbsp;<input type="text" v-model="setRangePosition.start" />~&nbsp;end&nbsp;:&nbsp;<input type="text" v-model="setRangePosition.end" />
          <Btn @click="asyncDo('setRangeAt')">setRangeAt</Btn>
        </li>
        <li>
          <Btn @click="asyncDo('getRange')">getRange</Btn>
          <span class="text">
            current range position: start&nbsp;:&nbsp;<i>{{ rangePosition.start }}</i> ~ end&nbsp;:&nbsp;<i>{{ rangePosition.end }}</i>
          </span>
        </li>
      </ul>
      <!-- <ul class="content fourth">
        <li>
          <input type="text" v-model="customCursor.position" />
          <Btn @click="asyncDo('setCustomCursorAt')">setCustomCursorAt</Btn>
        </li>
      </ul> -->
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
        '<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong>近日</strong></span>，教育部官网公布了<strong><span style="color: #34495e;">《对十三届全国人大四次会议<span style="text-decoration: underline;"><em>第4114号</em></span>建议的答复》</span></strong>，其中提到，新一轮&ldquo;双一流&rdquo;建设，按照&ldquo;以需求为导向、<span style="color: #003a54;">以学科为基础</span>、以比选为手段、确保平稳推进&rdquo;的路径进行调整认定，<strong><span style="color: #e03e2d;">不搞平衡照顾</span></strong>。</p>\n<p>&nbsp; &nbsp; &nbsp; <em><span style="color: #003a54; font-size: 18px;"><strong>早在去年9月27日</strong></span></em>，教育部官网在《关于政协十三届全国委员会第三次会议第4829号（教育类377号）提案答复》中就已明确，&ldquo;双一流&rdquo;首轮建设2020年结束，将根据期末建设成效评价结果等情况，坚持质量、水平与需求相统一，动态调整下一轮建设范围。<strong><span style="color: #e03e2d;">不搞全覆盖，不搞终身制，不搞安排照顾</span></strong>。</p>\n<table style="border-collapse: collapse; width: 99.815%; height: 44px;" border="1">\n<tbody>\n<tr style="height: 22px;">\n<td style="width: 24.6988%; height: 22px;">测试一</td>\n<td style="width: 24.6988%; height: 22px;">&nbsp;</td>\n<td style="width: 24.6988%; height: 22px;">测试三</td>\n<td style="width: 24.6988%; height: 22px;">测试四</td>\n</tr>\n<tr style="height: 22px;">\n<td style="width: 24.6988%; height: 22px;">&nbsp;</td>\n<td style="width: 24.6988%; height: 22px;">测试六</td>\n<td style="width: 24.6988%; height: 22px;">测试七</td>\n<td style="width: 24.6988%; height: 22px;">测试八</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong><span style="color: #34495e;">上述文件中指出</span></strong></span>，党中央、国务院提出实施&ldquo;双一流&rdquo;建设战略，将<strong><span style="color: #e67e23;">&ldquo;211工程&rdquo;、&ldquo;985工程&rdquo;</span></strong>、&ldquo;高等学校创新能力提升计划&rdquo;等重点建设项目统筹纳入&ldquo;双一流&rdquo;建设，<span style="text-decoration: underline; color: #e67e23;"><em>打破建设身份固化、竞争缺失的弊端、建立分类建设特色化质量发展的新建设模式</em></span>。</p>\n<p><span style="font-size: 18px;"><span style="color: #34495e;">&nbsp; &nbsp; &nbsp; </span><span style="color: #34495e;">文件同时提出</span></span>：<strong><span style="color: #843fa1;">将在科技平台基地建设布局中加大对地方高校的倾斜</span></strong>。邀请地方教育行政主管部门和部分地方高校参加全国高校科技工作会、高校科技工作专题培训；支持地方高校根据自身发展需求，<span style="color: #3598db;"><em>整合创新资源，建设各类国家级、省部级</em></span>、<strong><span style="color: #169179;">校级科技创新平台</span></strong>。</p>\n<p><span style="font-size: 18px;">&nbsp; &nbsp; &nbsp; <strong style="font-size: 18px;">将通过部省合建</strong></span>、对口支援、专项工作等多种途径加大对河北省学科建设的指导，支持其积极服务区域经济社会发展，增强优势特色。进一步发挥京津冀高校科技创新整体优势，<strong><span style="background-color: #c2e0f4; color: #843fa1; font-size: 18px;">鼓励<em>京津冀高校建立科</em>研合作关系</span></strong>。</p>\n<p><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" />北<img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" />京<img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /><img src="https://file11info.ppdai.com/63d2173f99934545a1b2f4c7b24cb2dd.jpeg" alt="" width="107" height="107" /></p>\n<p><span style="font-size: 18px; color: #843fa1;"><strong>&nbsp; &nbsp; &nbsp; 有记者提问称</strong></span>，七国集团将于今天举行视频会议，<span style="text-decoration: underline; color: #e67e23;"><em>讨论阿富汗危机</em></span>。据媒体报道，英<strong>国计划在会</strong>上推动各国考虑对<span style="color: #e03e2d; font-size: 18px;"><strong>塔利班</strong></span>实施新的制裁。<span style="color: #3598db;"><em>请问中方对此有何评论？</em></span></p>',
      countDown: INITIAL_COUNT_DOWN,
      position: '',
      currentCursorPosition: -1,
      customCursor: { position: -1 },
      rangePosition: { start: -1, end: -1 },
      setRangePosition: { start: -1, end: -1 }
    }
  },
  components: {
    editor: Editor,
    Btn
  },
  watch: {},
  methods: {
    updateContent() {
      let { id } = this
      const instance = tinymce.get(id)
      const bookmark = instance.selection.getBookmark(2)
      let oldContent = instance.getContent()
      instance.setContent(`${oldContent}</p>\n<p>&nbsp; &nbsp; &nbsp; <span style="font-size: 18px;"><strong>动态添加内容！</strong></span></p>`)
      instance.selection.moveToBookmark(bookmark)
    },
    tiny() {
      // const { instance, root, TreeWalker } = util
      const instance = tinymce.get(this.id)
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      return { instance, root, TreeWalker, tinymce }
    },
    asyncDo(methodName) {
      let { countDown } = this
      if (--countDown > 0) {
        Object.assign(this, { countDown })
        setTimeout(this.asyncDo.bind(this, methodName), 1000)
      } else {
        Object.assign(this, { countDown })
        this[methodName]()
        this.countDownReset()
      }
    },
    countDownReset() {
      Object.assign(this, { countDown: INITIAL_COUNT_DOWN })
    },
    getTextContentBeforeElemNode(instance, elemNode) {
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      let walker = new TreeWalker(root)
      let [continueFlag, tempTextContent, prevNode] = [true, '', null]
      do {
        let currnetNode = walker.current()
        if (currnetNode === elemNode) {
          console.log('currnetNode:', currnetNode, ',currnetNode textContent:', currnetNode.textContent, 'textContent length:', currnetNode.textContent.length)
          continueFlag = false
        } else {
          if (currnetNode.nodeName === '#text') {
            tempTextContent += currnetNode.textContent
          } else if (currnetNode.nodeName === 'IMG') {
            tempTextContent += 'i'
          }
        }
        prevNode = currnetNode
      } while (walker.next() && continueFlag)
      return tempTextContent
    },
    transletPosition(position, instance) {
      position = parseInt(position)
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      let walker = new TreeWalker(root)
      console.log('transletPosition:', position)
      let [continueFlag, tempTextContent, prevPosition, prevNode] = [true, '', 0, null]
      let [resultNode, resultOffset] = [null, -1]
      do {
        let currnetNode = walker.current()
        let offset = 0
        if (currnetNode.nodeName === '#text') {
          tempTextContent += currnetNode.textContent
          if (tempTextContent.length >= position) {
            offset = position - prevPosition
            console.log('currnetNode:', currnetNode, ' --- tempTextContent.length:', tempTextContent.length, ' --- offset:', offset)
            resultNode = currnetNode
            resultOffset = offset
            continueFlag = false
          } else {
            prevPosition = tempTextContent.length
          }
        } else if (currnetNode.nodeName === 'IMG') {
          tempTextContent += 'i'
          if (tempTextContent.length === position) {
            const parentNode = tinymce.DOM.getParent(
              currnetNode,
              function(node) {
                return node !== currnetNode
              },
              root
            )
            let textContentBeforeParentNode = this.getTextContentBeforeElemNode(instance, parentNode)
            resultNode = parentNode
            resultOffset = tempTextContent.length - textContentBeforeParentNode.length
            continueFlag = false
          } else {
            prevPosition = tempTextContent.length
          }
        }
        prevNode = currnetNode
      } while (walker.next() && continueFlag)
      return { resultNode, resultOffset }
    },
    transletToPosition(instance, container, offset) {
      const root = instance.dom.getRoot()
      let TreeWalker = tinymce.dom.TreeWalker
      let walker = new TreeWalker(root)
      let [continueFlag, tempTextContent, prevNode] = [true, '', null]
      let position = -1
      do {
        let currnetNode = walker.current()
        if (currnetNode === container) {
          console.log('currnetNode:', currnetNode, ',currnetNode textContent:', currnetNode.textContent, 'textContent length:', currnetNode.textContent.length)
          console.log('offset:', offset)
          position = tempTextContent.length + offset
          continueFlag = false
        } else {
          // console.log('currnetNode.nodeName:', currnetNode.nodeName)
          if (currnetNode.nodeName === '#text') {
            tempTextContent += currnetNode.textContent
          } else if (currnetNode.nodeName === 'IMG') {
            tempTextContent += 'i'
          }
        }
        prevNode = currnetNode
      } while (walker.next() && continueFlag)
      return position
    },
    createRange(startContainer, startOffset, endContainer, endOffset) {
      const rng = tinymce.DOM.createRng()
      rng.setStart(startContainer, startOffset)
      if (endContainer) {
        rng.setEnd(endContainer, endOffset)
      }
      return rng
    },
    setCursorAt() {
      let { id, position } = this
      const instance = tinymce.get(id)
      let { resultNode, resultOffset } = this.transletPosition(position, instance)
      if (resultNode) {
        instance.selection.setCursorLocation(resultNode, resultOffset)
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
      let position = this.transletToPosition(instance, startContainer, startOffset)
      Object.assign(this, { currentCursorPosition: position })
    },
    getRange() {
      let { id } = this
      const instance = tinymce.get(id)
      const root = instance.dom.getRoot()
      let range = instance.selection.getRng()
      console.log('range:', range)
      let { endContainer, endOffset, startContainer, startOffset } = range
      let startPositoin = this.transletToPosition(instance, startContainer, startOffset)
      let endPosition = this.transletToPosition(instance, endContainer, endOffset)
      Object.assign(this.rangePosition, { start: startPositoin, end: endPosition })
    },
    setRangeAt() {
      const { id, setRangePosition } = this
      const { start, end } = setRangePosition
      const instance = tinymce.get(id)
      const { resultNode: startNode, resultOffset: startOffset } = this.transletPosition(start, instance)
      const { resultNode: endNode, resultOffset: endOffset } = this.transletPosition(end, instance)
      const tempRange = this.createRange(startNode, startOffset, endNode, endOffset)
      instance.selection.setRng(tempRange)
    },
    setCustomCursorAt() {
      const { id, customCursor } = this
      const instance = tinymce.get(id)
      const { position } = customCursor
      const { resultNode, resultOffset } = this.transletPosition(position, instance)
      console.log('resultNode:', resultNode, ', resultOffset:', resultOffset)
      tinymce.DOM.setHTML(resultNode, '<span>999<span>')
    }
  },
  created() {},
  mounted() {
    tinymce.init({}) // 这里传个空对象就可以了
    setTimeout(() => (window.tiny = this.tiny()), 2000)
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
  .display {
    margin: 10px 0 0 0;
    .setFlexPos(row, center, center);
  }
  .container {
    .setFlexPos(row, space-between, center);
    flex-wrap: wrap;
    .content {
      margin: 0 0 8px 0;
      &.first {
        .setSize(200px, auto);
      }
      &.second {
        .setSize(360px, auto);
      }
      &.third {
        .setSize(500px, auto);
      }
      &.fourth {
        .setSize(280px, auto);
      }
      border: 1px solid #999;
      border-radius: 4px;
      padding: 4px 0;
      li {
        margin: 6px 0;
        input {
          margin: 0 12px 0 0;
          border: 1px solid blue;
          display: inline-block;
          width: 60px;
          padding: 5px 10px 3px 10px;
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
}
</style>
