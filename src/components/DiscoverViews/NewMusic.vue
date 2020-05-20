<template>
  <div class="new-music">
    <div class="new-music-nav">最新音乐</div>
    <div>
      <ul class="new-music-list">
        <li v-for="n in newsong.result" :key="n.id" class="list-music">
          <div class="new-music-img">
            <img :src="n.picUrl" alt />
            <div class="btn">
              <span @click="playMusic(n.id)" class="icon-play">
                <i class="el-icon-caret-right"></i>
              </span>
            </div>
          </div>
          <div class="list-music-right">
            <div class="new-music-name">{{n.name}}</div>
            <div class="list-music-artists">{{n.song.artists[0].name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsong: {}
    };
  },
  created() {
    this.axios("/music/personalized/newsong").then(res => {
      this.newsong = res.data;
    });
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
.new-music-nav {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
.new-music-list {
  width: 100%;
  height: 550px;

  .list-music {
    width: 50%;
    float: left;
    padding: 20px 0 0 0;
    position: relative;

    .new-music-img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      overflow: hidden;
      &:hover .icon-play {
        display: block;
        cursor: pointer;
      }
    }
    .list-music-right {
      position: absolute;
      top: 20px;
      left: 110px;
    }
    .new-music-name {
      height: 50px;
      line-height: 50px;
      font-weight: 700;
      font-size: 16px;
    }
    .list-music-artists {
      font-size: 14px;
      font-weight: 200;
    }

    .icon-play {
      position: absolute;
      top: 50px;
      left: 30px;
      width: 25px;
      height: 25px;
      color: #dd6d60;
      font-size: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      display: none;
    }

    .el-icon-caret-right {
      line-height: 25px;
      width: 25px;
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>