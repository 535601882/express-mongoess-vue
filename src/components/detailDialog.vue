<template>
  <el-dialog
    title="提示"
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
      }
    };
  },
  created(){},
  computed:{
    dialogVisible:{
      get(){
        this.isEdit && this.initForm()
        return this.visible
      },
      set(val){
        this.$emit('update:visible',val)
      }
    }
  },
  methods:{
    initForm(){
      this.form = this.info
    },
    handleEnter(){
      let obj = Object.assign({},this.form)
      obj.date = getNowFormatDate()
      this.$emit('submit',obj)
    }
  },
  watch:{
    visible(val){
      if (!val) {
        this.form = {
          name:'',
          birthday:'',
          address:''
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
