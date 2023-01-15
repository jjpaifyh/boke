<!--  -->
<template>
  <div class="box">
    <div class="top">
      <div class="z">
        <div @click="go_sy" class="sy">首页</div>
        <div>创作新文章</div>
      </div>
      <div class="y">
        <img :src="img" alt="" />
      </div>
    </div>
    <div class="x">
      <mavon-editor
        class="markdown"
        :style="is_tf ? 'width: 85%;' : 'width: 100%;'"
        v-model="value"
        @imgAdd="imgAdd"
        ref="md"
        @save="save"
        :toolbars="toolbars"
        @fullScreen="fullscreen"
      />
    </div>
    <div class="butto">
      <div class="img_get">
        <!--  -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题封面">
            <el-upload
              class="kk"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="getFileFn"
              :limit="1"
              ref="upload"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-form-item label="文章题目">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-radio-group v-model="form.label">
              <el-radio label="使用教程"></el-radio>
              <el-radio label="娱乐爱好"></el-radio>
              <el-radio label="学习笔记"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章简介">
            <el-input
              show-word-limit
              maxlength="150"
              type="textarea"
              v-model="form.synopsis"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表单 -->
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
// 全局注册
import Vue from "vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { list_post, text_md_watch, comment_v1 } from "../request/boke/api";
import axios from "axios";
import { init } from "events";
import Bottom from "../components/Bottom";
// use
Vue.use(mavonEditor);
export default {
  name: "",
  data() {
    return {
      value: "",
      img: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      is_tf: true,
      // 表单
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
      form: {},
      file_img: {},
    };
  },
  components: { Bottom },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    imgAdd(pos, file) {
      // console.log("开始上传");
      // 上传图片
      console.log(file);
      let formData = new FormData();
      formData.append("image", file);
      axios({
        url: "http://localhost:2000/list_post", //请求地址
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        let path = res.data.path;
        // 修改刚添加的md文本的图片路径
        this.$refs.md.$img2Url(pos, "http://localhost:2000" + path);
      });
    },
    save() {
      console.log(this.form);
      this.form.name = this.$store.state.user.name;
      text_md_watch({
        data: this.value,
        title: this.form.title,
        label: this.form.label,
        synopsis: this.form.synopsis,
        name: this.form.name,
        img: this.form.tp_path,
      }).then((res) => {
        console.log(res);
      });
      console.log("保存");
      console.log(this.value);
    },
    init() {
      this.img = this.$store.state.user.url_img;
    },
    go_sy() {
      this.$router.push("/");
    },
    // 放大图片
    fullscreen() {
      this.is_tf = !this.is_tf;
    },
    // 删除图片
    handleRemove(file) {
      this.$refs.upload.uploadFiles.length = 0;
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("cscscccs");
    },
    // 下载图片
    handleDownload(file) {
      console.log(file.url);
    },
    // 提交表单
    onSubmit() {
      console.log(this.form);
      if (
        this.form.label != undefined &&
        this.value != undefined &&
        this.form.title != undefined &&
        this.form.tp_path != undefined &&
        this.form.synopsis != undefined
      ) {
        if (this.form.synopsis.length >= 40) {
          this.$confirm("确定创建本篇文章？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.save();
              this.$Message({
                type: "success",
                message: "创建成功!",
              });
              this.$router.push("/init");
            })
            .catch(() => {
              this.$Message({
                type: "info",
                message: "已取消",
              });
            });
        } else {
          this.$confirm(`简介字数需要大于40`, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
        }
      } else {
        let label = this.form.label ? 0 : "分类";
        console.log(this.form.label);
        let synopsis = this.form.synopsis ? 0 : "简介";
        console.log(this.form.synopsis);
        let title = this.form.title ? 0 : "标题";
        console.log(this.form.title);
        let tp_path = this.form.tp_path ? 0 : "封面图";
        console.log(this.tp_path);
        let vlau = this.value ? 0 : "内容";
        this.$confirm(
          `${vlau || title || label || tp_path || synopsis}不能为空！！！`,
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
      }
    },
    getFileFn(files, fileList) {
      console.log(files);
      console.log(files.raw);
      this.file_img = files.raw;
      let formData = new FormData();
      formData.append("image", this.file_img);
      console.log("开始上传");
      axios({
        url: "http://localhost:2000/list_post", //请求地址
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        console.log(res.data);
        this.form.tp_path = res.data.path;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.markdown {
  /* position: relative; */

  min-height: 90vh;
  /* 暂时未限制高度 height: 500px;*/
  margin: 0 auto;
  z-index: 2;
}
.box {
  margin-top: 61px;
  width: 100%;
  height: 100vh;
}
.top {
  width: 100vw;
  height: 61px;
  background-color: rgb(60, 60, 60);
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  z-index: 99;
}
.z {
  width: 30vw;
  height: 61px;
  /* background-color: blue; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: rgb(250, 250, 73);
  font-size: 700;
}
.sy {
  width: 30%;
  height: 61px;
  text-align: center;
  line-height: 61px;
  color: rgb(255, 255, 255);
  font-size: 700;
}
.sy:hover {
  background-color: rgb(85, 85, 85);
}
.y {
  width: 15vw;
  height: 61px;
  /* background-color: blue; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.y > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.butto {
  width: 60%;
  height: 600px;
  background-color: rgb(255, 255, 255);
  /* margin: 5px; */
  margin: auto;
}
/* .x {
  width: 85%;
  height: 90vh;
  margin: auto;
} */
.img_get {
  width: 50vw;
  height: 40vh;
  /* background-color: aqua; */
  margin: auto;
  margin-top: 10px;
  padding-top: 20px;
}
.kk {
  width: 100%;
  /* margin-bottom: 30px;
  margin-left: 60px; */
}
</style>