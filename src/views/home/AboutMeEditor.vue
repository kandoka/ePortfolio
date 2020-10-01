<template>
  <div>
    <div class="edit">
      <h1>Update your information</h1>
      <el-card class="richText">
      <el-form>
<!--              :label-position="labelPosition"-->
<!--              label-width="80px"-->
<!--              :model="customer"-->
<!--              :rules="rules"-->
<!--              ref="ruleForm">-->
        <el-container style="height: 100%">
          <el-main>
          <el-row :gutter="20">

            <el-col :span="5">
              <div>
<!--                <el-avatar-->
<!--                        icon="el-icon-user-solid"-->
<!--                        :size="200"-->
<!--                        shape="square"-->
<!--                        fit="fill"-->
<!--                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"-->
<!--                ></el-avatar>-->
              </div>
<!--      头像上传        -->
<!--              <el-upload-->
<!--                      class="upload-demo"-->
<!--                      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                      :on-preview="handlePreview"-->
<!--                      :on-remove="handleRemove"-->
<!--                      :before-remove="beforeRemove"-->
<!--                      multiple-->
<!--                      :limit="3"-->
<!--                      :on-exceed="handleExceed"-->
<!--                      :file-list="fileList">-->
<!--                <el-button size="small" type="primary">Upload your avatar</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">Only jpg/png files without exceeding 500kb are available</div>-->
<!--              </el-upload>-->
              <div class="el-upload">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" >
                  </i>
                </el-upload>
              </div>
            </el-col>

            <el-col :span="16">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="First Name" prop="name">
                    <el-input v-model="user.firstName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Last Name" prop="name">
                    <el-input v-model="user.lastName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <div>
                    <Editor
                            v-model="user.details"
                            ref="detailsEditor"
                    />
                  </div>
              </el-row>
            </el-col>

            <el-col :span="3" :gutter="20">
              <el-row>
                <el-form-item
                        label="Phone"
                        prop="phone">
                  <el-input v-model="user.phone"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="E-mail" prop="email">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
          </el-main>

          <el-footer>
            <el-col >
              <el-form-item >
                <el-button type="primary" @click="submitForm()">Submit</el-button>
                <el-button>Cancel</el-button>
              </el-form-item>
            </el-col>
          </el-footer>

        </el-container>
      </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Editor from '@/components/TextEditor'
  export default {
    name: 'AboutMeEditor',
    components: {
      Editor
    },
    data(){
      return {
        //用户详情
        user:{
          userId: '',
          firstName:'',
          lastName:'',
          phone:'',
          email:'',
          details:''
        },
        //头像地址
        // fileList: [],
        imageUrl: ''

        // rules:{
        //   name:[
        //     { required: true, message: 'Please enter your name', trigger: 'blur' }
        //   ],
        //   phone:[
        //     { required: true, message: 'Please enter your phone number', trigger: 'blur' }
        //   ],
        //   email:[
        //     { required: true, message: 'Please enter your email', trigger: 'blur' }
        //   ],
        //   desc:[
        //     { required: true, message: 'Please enter your brief introduction', trigger: 'blur' }
        //   ],
        // }
      }
    },
    created() {
      return axios.get('/profile/1').then(res => {
        console.log(res)
        //取得数据
        const profileData = res.data.data
        const form = this.user
        const editor = this.$refs.detailsEditor

        //页面填值
        form.userId = profileData.userId
        form.details = profileData.details
        editor.content = profileData.details
        console.log(editor)
      })
    },
    methods: {
      submitForm(){
        // console.log(this.$refs.detailsEditor.content)
        const form  = this.user
        const editor = this.$refs.detailsEditor
        form.details = editor.content
        // console.log(this.user.details)
        return axios.post('/profile', this.user).then(res => {
          console.log(res)
        })
      },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // handlePreview(file) {
      //   console.log(file);
      // },
      // handleExceed(files, fileList) {
      //   this.$message.warning(`You have upload ${files.length + fileList.length} files`);
      // },
      // beforeRemove(file, fileList) {
      //   console.log(fileList)
      //   return this.$confirm(`Are you sure to remove ${ file.name }?`);
      // },

      //头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Only JPG is available!');
        }
        if (!isLt2M) {
          this.$message.error('The size of image should not exceed 2MB!');
        }
        return isJPG && isLt2M;
      }


      // changeParentContent(val){
      //   console.log(val)
      // }
    }
  }

</script>

<style scoped>
  .richText{
    width: 100%;
    height: 100%;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
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