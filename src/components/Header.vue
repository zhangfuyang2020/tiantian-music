<template>
  <div class="ttmusic-header">
    <div class="ttmusic-header-left">
      <div class="ttmusic-header-logo">
        <img src="../assets/img/Logo.png" alt />
      </div>
      <div class="ttmusic-header-text">天天音乐</div>
    </div>

    <div class="ttmusic-header-btn">
      <el-button-group>
        <el-button class="btn btn-left" type="primary" @click="backOff">
          <i class="el-icon-arrow-left el-icon--left"></i>
        </el-button>
        <el-button class="btn btn-right" type="primary" @click="forward">
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
    </div>

    <div class="ttmusic-header-search">
      <input v-model="inputValue" placeholder="搜索音乐、视频" class="search" @keyup.enter="toResult" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    toResult() {
      // 非空判断
      if (this.inputValue == "") {
        // 提示用户
        this.$message.warning("请输入内容");
      } else {
        // 去搜索页 携带数据
        this.$router.push("/search?q=" + this.inputValue);
      }
      // 刷新页面
      this.$router.go(0);
    },
    forward() {
      this.$router.go(1);
      setInterval(() => {
        this.$router.go(0);
      }, 100);
    },
    backOff() {
      this.$router.go(-1);
      setInterval(() => {
        this.$router.go(0);
      }, 100);
    }
  }
};
</script>


<style lang="scss" scoped>
.ttmusic-header-left {
  position: relative;
  top: 0;
  left: 0;

  .ttmusic-header-logo {
    position: absolute;
    height: 26px;
    width: 26px;
    background-color: #f3f3f3;
    border-radius: 50%;
    top: 12px;

    img {
      height: 16px;
      width: 16px;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
  .ttmusic-header-text {
    position: absolute;
    height: 50px;
    width: 100px;
    top: 0;
    left: 40px;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 0.1cm;
  }
}
.ttmusic-header-btn {
  width: 60px;
  margin-left: 200px;
  position: relative;

  .btn {
    top: 12px;
    width: 30px;
    background-color: #c62f2f;
    border: 1px solid #a72727;
    padding: 0;
    height: 26px;
  }
}
.ttmusic-header-search {
  position: absolute;
  right: 20px;
  top: 10px;
  width: 300px;
  height: 30px;

  .search {
    width: 100%;
    height: 30px;
    padding: 0 20px;
    background-color: #a82828;
    border-radius: 7px;
    color: #f3f3f3;
    outline: 0;
  }
}
</style>