<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" alt />
          <span class="name">{{ playlist.creator.nickname }}/</span>
          <span class="time">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              v-for="(p, index) in playlist.tracks"
              :key="index"
              class="el-table__row"
              @dblclick="playMusic(p.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap p-img" @click="playMusic(p.id)">
                  <img :src="p.al.picUrl" alt />
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ p.name }}</span>
                  </div>
                  <span>{{ p.subTitle }}</span>
                </div>
              </td>
              <td>{{ p.ar[0].name }}</td>
              <td>{{ p.al.name }}</td>
              <td>{{ setTime(p.dt) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total + hotCount})`" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap" v-if="hotCount > 0">
          <p class="title">
            精彩评论
            <span class="number">({{ hotCount }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div v-for="(item, index) in hotComment" :key="index" class="item">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | formatDate }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap" v-if="total > 0">
          <p class="title">
            最新评论
            <span class="number">( {{total}} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | formatDate }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { formatDate } from "../assets/util";
export default {
  name: "playlist",
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // tracks 歌曲列表
      playlist: {},
      // 热门评论
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 普通评论
      comments: []
    };
  },
  created() {
    // 获取歌单详情
    this.axios({
      url: "/music/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      this.playlist = res.data.playlist;
    });
    // 获取 评论
    this.axios({
      url: "/music/comment/hot",
      method: "get",
      params: {
        id: this.$route.query.q,
        // 传递类型
        type: 2
      }
    }).then(res => {
      // console.log(res)
      this.hotComment = res.data.hotComments;
      // 保存个数
      this.hotCount = res.data.total;
    });

    // 获取 最新评论
    this.axios({
      url: "/music/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      // console.log(res)
      // 总个数
      this.total = res.data.total;
      // 评论数据
      this.comments = res.data.comments;
    });
  },
  methods: {
    handleCurrentChange(val) {
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.axios({
        url: "/music/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          // 根据页码计算
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        // console.log(res)
        // 总个数
        this.total = res.data.total;
        // 评论数据
        this.comments = res.data.comments;
      });
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
    }
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      return formatDate(date, "MM-dd hh:mm:ss");
    }
  }
};
</script>
<style lang="scss" scoped>
.playlist-container {
  margin: auto;
  padding-top: 40px;

  .top-wrap {
    display: flex;
  }

  span {
    font-size: 17px;
  }

  .img-wrap {
    margin-right: 30px;
  }

  .img-wrap img {
    width: 230px;
    height: 230px;
  }

  .info-wrap .title {
    margin-bottom: 20px;
  }

  .info-wrap .author-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }

  .info-wrap .author-wrap img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .info-wrap .author-wrap .name {
    margin-right: 10px;
  }

  .info-wrap .author-wrap .time {
    font-size: 14px;
  }

  .info-wrap .play-wrap {
    width: 120px;
    height: 35px;
    border-radius: 4px;
    background: linear-gradient(to right, #e85e4d, #c6483c);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
  }

  .info-wrap .play-wrap span {
    color: white;
  }

  .info-wrap .play-wrap span.iconfont {
    margin-right: 8px;
  }

  .info-wrap .play-wrap span.text {
    font-size: 16px;
  }

  .info-wrap .tag-wrap {
    display: flex;
    margin-bottom: 15px;
  }

  .info-wrap .tag-wrap span {
    margin: 0;
  }

  .info-wrap .tag-wrap ul {
    display: flex;
    align-items: center;
  }

  .info-wrap .tag-wrap li {
    font-size: 15px;
  }

  .info-wrap .tag-wrap li:not(:last-child)::after {
    content: "/";
    margin: 0 4px;
  }

  .info-wrap .desc-wrap span:last-child {
    font-size: 15px;
  }

  .info-wrap span:first-child {
    margin-right: 10px;
  }

  .comment-wrap {
    margin-bottom: 70px;
  }

  .comment-wrap .title {
    font-size: 20px;
  }

  .comment-wrap .title .number {
    color: black;
    font-size: 18px;
  }

  .comment-wrap .item {
    display: flex;
    padding-top: 20px;
  }

  .comment-wrap .item .icon-wrap {
    margin-right: 15px;
  }

  .comment-wrap .item .icon-wrap img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .comment-wrap .item:not(:last-child) .content-wrap {
    border-bottom: 1px solid #f2f2f1;
  }

  .comment-wrap .item .date {
    color: #bebebe;
    font-size: 14px;
  }

  .comment-wrap .item .content-wrap {
    padding-bottom: 20px;
    flex: 1;
  }

  .comment-wrap .item .content-wrap .name {
    color: #517eaf;
    font-size: 14px;
  }

  .comment-wrap .item .content-wrap .comment {
    font-size: 14px;
  }

  .comment-wrap .item .content-wrap .content,
  .comment-wrap .item .content-wrap .re-content {
    margin-bottom: 10px;
  }

  .comment-wrap .item .content-wrap .re-content {
    padding: 10px;
    background-color: #e6e5e6;
    border-radius: 5px;
  }
}
.p-img img {
  width: 80px !important;
  height: 80px !important;
  border-radius: 8px;
}
</style>
