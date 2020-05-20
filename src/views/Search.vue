<template>
  <div class="search">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到 {{ count }} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              v-for="(s, index) in songList"
              :key="index"
              class="el-table__row"
              @dblclick="playMusic(s.id)"
            >
              <td>{{index + 1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span class="name">{{ s.name }}</span>
                  </div>
                  <span class="alias" v-if="s.alias.length != 0">{{ s.alias[0] }}</span>
                </div>
              </td>
              <td>{{ s.artists[0].name }}</td>
              <td>{{ s.album.name }}</td>
              <td>{{ setTime(s.duration) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div v-for="(p, index) in playlists" :key="index" class="item" @click="toPlaylist(p.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ setCount(p.playCount) }}</span>
              </div>
              <img :src="p.coverImgUrl" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ p.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div v-for="(m, index) in mv" :key="index" class="item" @click="toMV(m.id)">
            <div class="img-wrap">
              <img :src="m.cover" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">播放量：{{ setCount(m.playCount) }}</div>
              </div>
            </div>
            <div class="info-wrap">
              <div class="name">{{ m.name }}</div>
              <div class="singer">{{ m.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      // tab切换时 会改变的数据
      activeIndex: "songs",
      // 保存 查询歌曲
      songList: [],
      // 保存歌单的字段
      playlists: [],
      // 保存mv的字段
      mv: [],
      // 搜索结果的总数
      count: 0
    };
  },
  created() {
    this.axios({
      url: "/music/search",
      method: "get",
      params: {
        keywords: this.$route.query.q,
        type: 1
      }
    }).then(res => {
      this.songList = res.data.result.songs;
      this.count = res.data.result.songCount;
    });
  },
  // 侦听器
  watch: {
    activeIndex() {
      // songs(歌曲 1)  lists(歌单 1000)  mv(mv 1004)
      let type = 1;
      let limit = 10;
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          limit = 30;
          break;
        case "lists":
          type = 1000;
          limit = 20;
          break;
        case "mv":
          type = 1004;
          limit = 12;
          break;

        default:
          break;
      }
      this.axios({
        url: "/music/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          type,
          limit
        }
      }).then(res => {
        // 获取歌曲
        if (type == 1) {
          this.songList = res.data.result.songs;
          this.count = res.data.result.songCount;
        }
        // 获取 歌单
        else if (type == 1000) {
          this.playlists = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
        } else if (type == 1004) {
          this.mv = res.data.result.mvs;
          this.count = res.data.result.mvCount;
        }
      });
    }
  },
  methods: {
    // mv详情页
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
    },
    // 歌单详情页
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`);
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
        this.$store.state.musicUrl = url;
      });
    },
    setTime(time) {
      // 时间
      let min = parseInt(time / 1000 / 60);
      let sec = parseInt((time / 1000) % 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
    setCount(count) {
      return count > 100000 ? parseInt(count / 10000) + "万" : count;
    }
  }
};
</script>

<style lang="scss">
img{
  width: 100%;
  height: 100%;
}
.search {
  .title-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;

    .title {
      margin-right: 10px;
    }
    .sub-title {
      font-size: 15px;
      color: #bebebe;
    }
  }

  .song-wrap {
    cursor: pointer;
    line-height: 30px;
    font-weight: 700;

    .name {
      font-weight: 500;
    }

    .alias {
      font-weight: 200;
    }
  }

  .iconfont {
    color: red;
    margin-left: 8px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item {
      width: 200px;
      cursor: pointer;
      margin-right: 40px;
      margin-bottom: 40px;

      .img-wrap {
        width: 100%;
        position: relative;
      }

      .img-wrap:hover > .icon-play {
        opacity: 1;
      }

      img {
        width: 100%;
        border-radius: 5px;
      }

      .num-wrap {
        position: absolute;
        color: #f3f3f3;
        top: 8px;
        right: 6px;
        display: flex;
        align-items: center;
        font-size: 14px;
      }

      .name{
        margin-top: 10px;
        line-height: 25px;
      }
      .singer {
        line-height: 25px;
      }

      .icon-play {
        font-size: 12px;
        display: flex;
        align-items: center;
        margin-right: 5px;
      }

      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: #fff;
        font-size: 15px;
      }

      .singer {
        font-size: 14px;
        color: #c5c5c5;
      }
    }
  }

  .items.mv {
    .item {
      width: 250px;
    }
  }
}
</style>
