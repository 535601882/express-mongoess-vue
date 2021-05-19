<template>
  <div class="home">
    <h1>express + mongoose 实现增删改查</h1>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchClick">查询</el-button>
        <el-button type="primary" @click="handleAddClick">添加</el-button>
      </el-form-item>
    </el-form>


    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="修改日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEditClick(scope.row)" size="small">编辑</el-button>

          <el-popconfirm title="确定删除吗？" @confirm="handleDelClick(scope.row)">
           <el-button type="danger" size="small"  slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <detailDialog :visible.sync='detailDialogFlag' :isEdit='isEdit' :info="currInfo" @submit="handleAddSubmit"></detailDialog>
  </div>
</template>

<script>
import detailDialog from "@/components/detailDialog"
import api from "@/api"
export default {
  name: 'Home',
  components: {
    detailDialog
  },
  data(){
    return {
      form: {
        name: ''
      },
      tableData: [],
      detailDialogFlag:false,
      isEdit:false,
      currInfo:{}
    }
  },
  created(){
    this.handleSearchClick()
  },
  methods: {
    // 查询
    handleSearchClick(){
      let obj = {}
      if (this.form.name) {
        obj = Object.assign({},this.form)
      }
      api.getUsers(obj).then(res => {
        this.tableData = res.result
      })
    },
    // 编辑
    handleEditClick(row){
      this.isEdit = true
      // 查询并赋值
      api.getUserId({id:row._id}).then(data => {
        console.log('data',data)
        if (data.status === 200) {
          this.currInfo = JSON.parse(JSON.stringify(row))
          this.detailDialogFlag = true
        }
      })
    },
    // 删除
    handleDelClick(row){
      api.delUser({id:row._id}).then(res => {
        if (res.status === 200) {
          this.handleSearchClick()
        }
      })
    },
    // 添加
    handleAddClick(){
      this.isEdit = false
      this.currInfo = {}
      this.detailDialogFlag = true
    },
    handleAddSubmit(obj){
      if (this.isEdit) {
        api.editUser(obj).then(res => {
          if (res.status === 200) {
            this.detailDialogFlag = false
            // 删除成功
            this.$message.success('修改成功!');
            // 重新获取
            this.handleSearchClick()
          }
        })
      } else {
        api.addUser(obj).then(res => {
          if (res.status === 200) {
            this.detailDialogFlag = false
            // 删除成功
            this.$message.success('添加成功!');
            // 重新获取
            this.handleSearchClick()
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.home{
  max-width: 80%;
  margin: 0 auto;
  text-align: left;
}
</style>
