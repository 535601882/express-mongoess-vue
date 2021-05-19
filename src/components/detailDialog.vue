<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
    width="30%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
            v-model="form.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <!--头像-->
      <el-form-item label="头像">
        <el-upload
            class="avatar-uploader"
            action="#"
            ref="upload"
            :http-request="UploadImage"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEnter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
import api from "@/api"
export default {
  name: 'detailDialog',
  props: {
    visible: Boolean,
    isEdit:Boolean,
    info:Object
  },
  data() {
    return {
      form:{
        name:'',
        birthday:'',
        address:''
      },
      imageUrl: ''
    };
  },
  created(){},
  computed:{
    title(){
      return this.isEdit ? "编辑" : "新增"
    },
    dialogVisible:{
      get(){
        return this.visible
      },
      set(val){
        this.$emit('update:visible',val)
      }
    }
  },
  methods: {
    initForm() {
      this.form = this.info
    },
    handleEnter() {
      let obj = Object.assign({}, this.form)
      obj.date = getNowFormatDate()
      this.$emit('submit', obj)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 文件提交
    UploadImage(param) {
      const formData = new FormData()
      formData.append('file', param.file) // 要提交给后台的文件
      console.log(param.file)
      api.uploadImg(formData).then(res => {
        this.imageUrl = "./uploads/"+res.filename
        console.log(res.path)
      })
      param.onSuccess()  // 上传成功的图片会显示绿色的对勾
      // param.onError()
    }
  },
  watch:{
    visible(val){
      if (val) {
        if(this.isEdit) {
          this.initForm()
        } else {
          this.form = {
            name:'',
            birthday:'',
            address:''
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
