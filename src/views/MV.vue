<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：2014-11-04</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <!-- 描述 -->
          <p class="desc">{{ mvInfo.desc }}</p>
        </div>
      </div>
      <!-- 热门评论 -->
      <div v-if="hotComments.length != 0" class="comment-wrap">
        <p class="title">
          热门评论
          <span class="number">({{ hotComments.length }})</span>
        </p>
        <div class="comments-wrap" v-for="item in hotComments" :key="item.commentId">
          <div class="item">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div v-if="item.beReplied.length != 0" class="re-content">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | formatDate }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="comments.length != 0">
        <p class="title">
          最新评论
          <span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="item in comments" :key="item.commentId">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div v-if="item.beReplied.length != 0" class="re-content">
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
        :page-size="5"
        :limit="limit"
      ></el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div v-for="(item, index) in simiMvs" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ setCount(item.playCount) }}</div>
              </div>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../assets/util";
export default {
  name: "mv",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv地址
      url: "",
      // 相关mv
      simiMvs: [],
      // mv的信息
      mvInfo: {},
      // 头像
      icon: "",
      // 普通评论
      comments: [],
      // 热门评论
      hotComments: []
    };
  },
  created() {
    // 获取mv播放地址
    this.axios({
      url: "/music/mv/url",
      method: "get",
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      this.url = res.data.data.url;
    });
    // 获取 相关的mv
    this.axios({
      url: "/music/simi/mv",
      method: "get",
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      this.simiMvs = res.data.mvs;
    });
    // 获取 mv的信息
    this.axios({
      url: "/music/mv/detail",
      method: "get",
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      this.mvInfo = res.data.data;
      // 获取 歌手信息
      this.axios({
        url: "/music/artists",
        method: "get",
        params: {
          id: this.mvInfo.artists[0].id
        }
      }).then(res => {
        this.icon = res.data.artist.picUrl;
      });
    });
    // 获取评论数据
    this.axios({
      url: "/music/comment/mv",
      method: "get",
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      this.comments = res.data.comments;
      this.hotComments = res.data.comments;
    });
  },
  methods: {
    handleCurrentChange(val) {
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.axios({
        url: "/music/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          // 根据页码计算
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        // 总个数
        this.total = res.data.total;
        // 评论数据
        this.comments = res.data.comments;
      });
    },
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
      setInterval(() => {
        this.$router.go(0);
      }, 100);
    },
    setCount(count) {
      return count > 100000 ? parseInt(count / 10000) + "万" : count;
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
.mv-container {
  display: flex;

  .title {
    margin-bottom: 20px;
  }

  .mv-wrap {
    width: 700px;
    margin-right: 35px;

    .date {
      margin-right: 25px;
    }

    .date,
    .number {
      color: #bebebe;
      font-size: 14px;
    }

    .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
    }

    .video-wrap video {
      border-radius: 5px;
      height: 100%;
      width: 100%;
      outline: none;
    }

    .info-wrap {
      margin-bottom: 50px;
    }

    .info-wrap .singer-info {
      display: flex;
      align-items: center;
      margin-bottom: 35px;
    }

    .info-wrap .singer-info .avatar-wrap {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
    }

    .info-wrap .singer-info .avatar-wrap img {
      height: 100%;
    }

    .info-wrap .mv-info .title {
      font-size: 30px;
    }

    .info-wrap .mv-info .desc {
      font-size: 15px;
      margin-top: 20px;
    }

    .comment-wrap {
      margin-bottom: 70px;
    }

    .comment-wrap .title {
      font-size: 25px;
    }

    .comment-wrap .title .number {
      color: black;
      font-size: 20px;
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
      line-height: 20px;
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

  .mv-recommend {
    flex: 1;

    .mvs .items {
      display: flex;
      flex-wrap: wrap;
    }

    .mvs .items .item {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
    }

    .mvs .items .item:hover {
      background-color: #f5f5f5;
    }

    .mvs .items .item .img-wrap {
      width: 180px;
      position: relative;
      margin-right: 10px;
    }

    .mvs .items .item .img-wrap > .icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      color: #dd6d60;
      font-size: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      opacity: 0;
    }

    .mvs .items .item .img-wrap > .icon-play::before {
      transform: translateX(3px);
    }

    .mvs .items .item .img-wrap:hover > .icon-play {
      opacity: 1;
    }

    .mvs .items .item .img-wrap img {
      width: 100%;
      border-radius: 5px;
    }

    .mvs .items .item .img-wrap .num-wrap {
      position: absolute;
      color: white;
      top: 0;
      right: 0;
      display: flex;
      align-content: center;
      font-size: 15px;
      padding-right: 5px;
      padding-top: 2px;
    }

    .mvs .items .item .img-wrap .num-wrap .icon-play {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 5px;
    }

    .mvs .items .item .img-wrap .time {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: white;
      font-size: 15px;
    }

    .mvs .items .item .info-wrap {
      flex: 1;
    }

    .mvs .items .item .info-wrap .name {
      font-size: 15px;
      line-height: 20px;
    }

    .mvs .items .item .info-wrap .singer {
      font-size: 14px;
      color: #c5c5c5;
      line-height: 20px;
      margin-top: 5px;
    }
  }
}
</style>
