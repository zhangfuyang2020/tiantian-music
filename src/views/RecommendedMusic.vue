<template>
  <div class="recommended-music">
    <!-- 头部 -->
    <div class="header-card">
      <div class="icon-wrap">
        <img :src="headerList.coverImgUrl" alt />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">{{headerList.name}}</div>
        <div class="info">{{headerList.description}}</div>
      </div>
      <img :src="headerList.coverImgUrl" alt class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 头部 -->
      <div class="tab-bar">
        <span class="item" :class="{active:tag == '全部'}" @click="tag = '全部'">全部</span>
        <span class="item" :class="{active:tag == '欧美'}" @click="tag = '欧美'">欧美</span>
        <span class="item" :class="{active:tag == '华语'}" @click="tag = '华语'">华语</span>
        <span class="item" :class="{active:tag == '流行'}" @click="tag = '流行'">流行</span>
        <span class="item" :class="{active:tag == '说唱'}" @click="tag = '说唱'">说唱</span>
        <span class="item" :class="{active:tag == '摇滚'}" @click="tag = '摇滚'">摇滚</span>
        <span class="item" :class="{active:tag == '民谣'}" @click="tag = '民谣'">民谣</span>
        <span class="item" :class="{active:tag == '电子'}" @click="tag = '电子'">电子</span>
        <span class="item" :class="{active:tag == '轻音乐'}" @click="tag = '轻音乐'">轻音乐</span>
        <span class="item" :class="{active:tag == '影视原声'}" @click="tag = '影视原声'">影视原声</span>
        <span class="item" :class="{active:tag == 'ACG'}" @click="tag = 'ACG'">ACG</span>
      </div>
      <!-- 内容区域 -->
      <div class="tab-content">
        <ul class="items">
          <li class="item" v-for="m in musicList" :key="m.id">
            <div class="img-wrap">
              <div class="num-wrap">播放量：{{setCount(m.playCount)}}</div>
              <img :src="m.coverImgUrl" alt />
              <span class="icon-play" @click="toPlaylist(m.id)">
                <i class="el-icon-caret-right"></i>
              </span>
            </div>
            <p class="name" @click="toPlaylist(m.id)">{{m.name}}</p>
          </li>
        </ul>
      </div>

      <el-pagination
        @current-change="handleCurrentChange"
        background
        :total="total"
        :current-page="page"
        :page-size="10"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      headerList: {},
      musicList: {},
      tag: "全部"
    };
  },
  // 侦听器
  watch: {
    tag() {
      this.HeaderList();
      this.MusicList();
    }
  },
  created() {
    this.HeaderList();
    this.MusicList();
  },
  methods: {
    HeaderList() {
      this.axios({
        url: "/music/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag
        }
      }).then(res => {
        this.headerList = res.data.playlists[0];
        // console.log(this.headerList);
      });
    },
    MusicList() {
      this.axios({
        url: "/music/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          // 起始的值（页码-1）* 每页的个数
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(res => {
        this.musicList = res.data.playlists;
        // console.log(res.data);
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.page = val;
      this.MusicList();
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`);
    },
    setCount(count) {
      return count > 100000 ? parseInt(count / 10000) + "万" : count;
    }
  }
};
</script>

<style lang="scss" scoped>
.recommended-music {
  .header-card {
    height: 200px;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;

    .icon-wrap {
      margin-right: 20px;
      z-index: 1;
    }

    .icon-wrap img {
      width: 160px;
      height: 160px;
      margin: 20px 20px;
    }

    .content-wrap {
      z-index: 1;
      margin: 20px 10px 0 0;
      overflow: hidden;
    }

    .content-wrap .tag {
      color: orange;
      border: 1px solid orange;
      width: 100px;
      height: 30px;
      text-align: center;
      border-radius: 5px;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
    }

    .content-wrap .title {
      color: #fff;
      padding-top: 10px;
    }

    .content-wrap .info {
      color: #aaa;
      font-size: 14px;
      padding-top: 5px;
      line-height: 25px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }

    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 0;
      filter: blur(10px);
    }

    .bg-mask {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .tab-container {
    padding-top: 30px;

    .tab-bar {
      display: flex;
      justify-content: flex-end;
    }

    .tab-bar .item {
      font-size: 15px;
      margin-right: 20px;
      cursor: pointer;
    }

    .tab-bar .item.active {
      color: #c62f2f;
    }

    .tab-content {
      margin-top: 20px;
    }

    .tab-content .items {
      display: flex;
      flex-wrap: wrap;
    }

    .items .item {
      width: 200px;
      margin: 10px 30px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .item img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }

    .item .num-wrap {
      position: absolute;
      width: 200px;
      height: 30px;
      left: 0;
      font-size: 14px;
      color: #fff;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.5);
      padding-left: 5px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .item .img-wrap {
      position: relative;
    }

    .img-wrap .icon-play {
      position: absolute;
      width: 40px;
      height: 40px;
      right: 10px;
      bottom: 13px;
      font-size: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      display: none;
    }

    .img-wrap:hover .icon-play {
      display: block;
    }

    .icon-play .el-icon-caret-right {
      width: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 30px;
      color: #c62f2f;
    }

    .item .name {
      font-size: 14px;
      line-height: 25px;
    }
  }
}
</style>