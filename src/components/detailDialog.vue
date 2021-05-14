<template>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input type="textarea" v-model="form.address"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'detailDialog',
  props: {
    visible: Boolean,
    isEdit:Boolean,
    info:Object
  },
  data() {
    return {
      form:{}
    };
  },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
