<template>
  <div class="discover-music">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="240px" class="banner">
      <el-carousel-item v-for="(item,i) in banner.banners" :key="i">
        <div class="banner-img">
          <img :src="item.imageUrl" />
          <div class="banner-img-text" :style="{backgroundColor:item.titleColor}">
            <p>{{item.typeTitle}}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <Recommended />
    <!-- 最新音乐 -->
    <NewMusic />
    <!-- 推荐MV -->
    <RecommendedMV />
  </div>
</template>

<script>
import Recommended from "../components/DiscoverViews/Recommended";
import NewMusic from "../components/DiscoverViews/NewMusic";
import RecommendedMV from "../components/DiscoverViews/RecommendedMV";

export default {
  data() {
    return {
      banner: {}
    };
  },
  created() {
    this.axios.get("/music/banner").then(res => {
      this.banner = res.data;
    });
  },
  components: {
    Recommended,
    NewMusic,
    RecommendedMV
  }
};
</script>

<style lang="scss" scoped>
.discover-music {
  padding: 0 5vw;

  .banner {
    img {
      width: 100%;
      height: 100%;
    }

    .banner-img {
      position: relative;
    }

    .banner-img-text {
      position: absolute;
      height: 25px;
      line-height: 25px;
      padding: 0;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      font-size: 12px;
      right: 0;
      bottom: 10px;
    }

    p {
      margin: 0 8px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>