<template>
  <div class="recommended">
    <div class="recommended-nav">推荐歌单</div>
    <div>
      <ul class="recommended-list">
        <li v-for="p in personalized.result" :key="p.id" class="list-music">
          <div class="list-music-img" @click="toPlaylist(p.id)">
            <img :src="p.picUrl" alt />
            <div class="img-playcount">{{setCount(p.playCount)}}</div>
            <div class="img-copywriter">{{p.copywriter}}</div>
          </div>
          <div class="list-music-name" @click="toPlaylist(p.id)">{{p.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personalized: {}
    };
  },
  created() {
    this.axios({
      url: "/music/personalized",
      method: "get",
      params: {
        limit: 10
      }
    }).then(res => {
      this.personalized = res.data;
      // console.log(this.personalized.result);
    });
  },
  methods: {
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`);
    },
    setCount(count) {
      return count > 100000 ? parseInt(count / 10000) + "万" : count;
    }
  }
};
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
.recommended-nav {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
.recommended-list {
  width: 100%;
  height: 525px;

  .list-music {
    width: 20%;
    min-height: 255px;
    float: left;
    padding: 10px 20px;

    .list-music-img {
      position: relative;
      cursor: pointer;

      &:hover .img-playcount {
        display: none;
      }
      &:hover .img-copywriter {
        display: block;
      }
    }
    .img-playcount {
      position: absolute;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
      min-width: 30px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #f3f3f3;
      border-bottom-left-radius: 5px;
      font-size: 12px;
      display: block;
    }
    .img-copywriter {
      position: absolute;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #f3f3f3;
      line-height: 30px;
      font-size: 13px;
      padding: 0 5px;
      display: none;
    }

    .list-music-name {
      line-height: 20px;
      cursor: pointer;
    }
  }
}
</style>