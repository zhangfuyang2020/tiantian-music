<template>
  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header class="ttmusic-header">
        <Header />
      </el-header>
      <!-- 主体内容 -->
      <el-container class="ttmusic-content">
        <Aside />
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
      <el-footer class="ttmusic-footer">
        <div class="player">
          <!-- autoplay 自动播放 -->
          <audio :src="this.$store.state.musicUrl" controls autoplay></audio>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "./components/Header";
import Aside from "./components/Aside";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Header,
    Aside
  }
};
</script>

<style lang="scss">
#app {
  min-width: 1270px;
}
.ttmusic-header {
  height: 50px !important;
  background-color: #c62f2f;
}
.ttmusic-content {
  max-height: calc(100vh - 100px);
}
.ttmusic-footer {
  height: 50px !important;

  .player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  audio {
    width: 100%;
    border-radius: none;
    outline: none;
  }
}
.iconfont {
  cursor: pointer;
}
</style>

