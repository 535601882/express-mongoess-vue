<template>
  <div class="home">
    <el-tabs v-model="activeName">
      <el-tab-pane label="express + mongoose 实现增删改查" name="1">
        
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
      </el-tab-pane>
      <el-tab-pane label="测试post请求" name="2">
        <el-form :model="formPost" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="formPost.name"></el-input>
          </el-form-item>
          <el-form-item label="兴趣">
            <el-checkbox-group v-model="formPost.interest">
              <el-checkbox label="足球"></el-checkbox>
              <el-checkbox label="篮球"></el-checkbox>
              <el-checkbox label="乒乓球"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="formPostSubmit('createPostDemo1')">立即创建 postFormUrlencoded</el-button>
            <el-button type="primary" @click="formPostSubmit('createPostDemo2')">立即创建 postFormData</el-button>
            <el-button type="primary" @click="formPostSubmit('createPostDemo3')">立即创建 postApplicationJson</el-button>
            <el-button type="primary" @click="formPostSubmit('createPostDemo4')">立即创建 get</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
      formPost: {
        name: "小張",
        interest: ['足球','篮球'],
        child: [{
          name: "小明",
          interest: ['足球'],
          child: [{
            name: "小李",
            interest: ['篮球'],
          }]
        }]
      },
      tableData: [],
      detailDialogFlag:false,
      isEdit:false,
      currInfo:{},
      activeName: "1"
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
    },
    // 测试提交
    formPostSubmit(name) {
      console.log(this.formPost)
      api[name](this.formPost).then(res => {
        console.log(res)
      })
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
