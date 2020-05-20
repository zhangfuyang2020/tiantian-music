<template>
  <el-aside width="180px" class="aside">
    <el-row class="tac">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#F5F5F7"
          text-color="#656565"
          active-text-color="#c63c26"
        >
          <div>
            <router-link tag="div" to="/">
              <el-menu-item index="1" class="aside-list">
                <i class="iconfont">&#xe667;</i>
                <span slot="title" class="aside-text">发现音乐</span>
              </el-menu-item>
            </router-link>
            <router-link tag="div" to="/recommended">
              <el-menu-item index="2" class="aside-list">
                <i class="iconfont">&#xe602;</i>
                <span slot="title" class="aside-text">推荐歌单</span>
              </el-menu-item>
            </router-link>
            <router-link tag="div" to="/latestmusic">
              <el-menu-item index="3" class="aside-list">
                <i class="iconfont">&#xe605;</i>
                <span slot="title" class="aside-text">最新音乐</span>
              </el-menu-item>
            </router-link>
            <router-link tag="div" to="/latestMV">
              <el-menu-item index="4" class="aside-list">
                <i class="iconfont">&#xe600;</i>
                <span slot="title" class="aside-text">最新MV</span>
              </el-menu-item>
            </router-link>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  height: calc(100vh - 100px);
  background-color: #f5f5f7;
}
.aside-text {
  margin-left: 10px;
  left: 40px;
  position: absolute;
}
</style>