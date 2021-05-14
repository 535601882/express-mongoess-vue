<template>
  <div class="home">
    <h1>express + mongoose 实现增删改查</h1>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查询</el-button>
        <el-button type="primary" @click="handleAddClick">添加</el-button>
      </el-form-item>
    </el-form>


    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="修改日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
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

    <detailDialog :visible.sync='detailDialogFlag' :isEdit='isEdit' :info="currInfo"></detailDialog> 
  </div>
</template>

<script>
import detailDialog from "@/components/detailDialog"
export default {
  name: 'Home',
  components: {
    detailDialog
  },
  data(){
    return {
      formInline: {
        name: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      detailDialogFlag:false,
      isEdit:false,
      currInfo:{}
    }
  },
  methods: {
    // 查询
    handleSubmit(){

    },
    // 编辑
    handleEditClick(){
      this.isEdit = true
      // 查询并赋值
      this.currInfo = {}
      this.detailDialogFlag = true
    },
    // 删除
    handleDelClick(){},
    // 添加
    handleAddClick(){
      this.isEdit = false
      this.detailDialogFlag = true
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