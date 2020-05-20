<template>
  <div class="latest-music">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{active:tag == 0}">全部</span>
      <span class="item" @click="tag = 7" :class="{active:tag == 7}">华语</span>
      <span class="item" @click="tag = 96" :class="{active:tag == 96}">欧美</span>
      <span class="item" @click="tag = 8" :class="{active:tag == 8}">日本</span>
      <span class="item" @click="tag = 16" :class="{active:tag == 16}">韩国</span>
    </div>
    <div>
      <table class="music-table" border="2">
        <tr class="music-tr m-tr">
          <th class="m-th"></th>
          <th class="m-th"></th>
          <th class="m-th">音乐标题</th>
          <th class="m-th">歌手</th>
          <th class="m-th">专辑</th>
          <th class="m-th">时长</th>
        </tr>
        <tr class="music-tr" v-for="(n,i) in newsMusic" :key="n.id">
          <td>{{i+1}}</td>
          <td>
            <div class="music-img">
              <img :src="n.album.blurPicUrl" alt />
              <i class="el-icon-caret-right" @click="playMusic(n.id)"></i>
            </div>
          </td>
          <td>
            <div class="music-title">
              <span>{{n.name}}</span>
              <span class="iconfont i-mv" @click="toMV(n.id)">&#xe62c;</span>
            </div>
          </td>
          <td>{{n.album.artists['0'].name}}</td>
          <td>{{n.album.name}}</td>
          <td>{{setTime(n.duration)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsMusic: [],
      tag: 0
    };
  },
  watch: {
    tag() {
      this.NewsMusic();
    }
  },
  created() {
    this.NewsMusic();
  },
  methods: {
    NewsMusic() {
      this.axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag
        }
      }).then(res => {
        this.newsMusic = res.data.data;
      });
    },
    setTime(time) {
      let min = parseInt(time / 1000 / 60);
      if (min < 10) {
        min = "0" + min;
      }
      let sec = parseInt((time / 1000) % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      return `${min}:${sec}`;
    },
    playMusic(id) {
      this.axios({
        url: "/music/song/url",
        method: "get",
        params: {
          id
        }
      }).then(res => {
        let url = res.data.data[0].url;
        // console.log(url);
        this.$store.state.musicUrl = url;
        // console.log(this.$store.state.musicUrl);
      });
    },
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
      setInterval(() => {
        this.$router.go(0);
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.latest-music {
  .tab-bar {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    border-bottom: 1px solid #ccc;

    .item {
      font-size: 15px;
      color: gray;
      margin-right: 20px;
      cursor: pointer;
    }
    .item.active {
      color: #dd6d60;
    }
  }

  .music-table {
    border: 1px solid #f3f3f3;
    width: 100%;
  }
}
.music-tr {
  display: flex;
  height: 80px;
  border: 1px solid #ddd;
  text-align: left;

  th,
  td {
    font-weight: 200;
    font-size: 14px;
    line-height: 80px;
    &:nth-child(1) {
      flex: 0.5;
      text-align: center;
    }

    &:nth-child(2) {
      flex: 1;
    }

    .music-img {
      position: relative;
      height: 60px;
      width: 60px;
      top: 10px;
      border-radius: 5px;
      overflow: hidden;

      &:hover .el-icon-caret-right {
        display: block;
      }
    }

    .el-icon-caret-right {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.5);
      width: 20px;
      height: 20px;
      top: 20px;
      left: 20px;
      border-radius: 50%;
      font-size: 18px;
      line-height: 20px;
      text-align: center;
      color: #dd6d60;
      cursor: pointer;
      display: none;
    }

    &:nth-child(3) {
      flex: 3;
    }

    &:nth-child(4) {
      flex: 2;
    }

    &:nth-child(5) {
      flex: 3;
    }

    &:nth-child(6) {
      flex: 1;
    }

    .i-mv {
      color: red;
      margin-left: 5px;
    }
  }
}
.m-tr {
  height: 40px !important;
}
.m-th {
  line-height: 40px !important;
}
</style>
