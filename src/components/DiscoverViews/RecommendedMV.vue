<template>
  <div class="new-mv">
    <div class="new-mv-nav">最新MV</div>
    <div>
      <ul class="new-mv-list">
        <li v-for="n in newMV.result" :key="n.id" class="list-mv">
          <div class="list-mv-img" @click="toMV(n.id)">
            <img :src="n.picUrl" alt />
            <div class="img-playcount">{{n.playCount}}</div>
            <div class="img-copywriter">{{n.copywriter}}</div>
          </div>
          <div class="list-mv-name">{{n.name}}</div>
          <div class="list-mv-artistName">{{n.artistName}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMV: {}
    };
  },
  created() {
    this.axios("/music/personalized/mv").then(res => {
      this.newMV = res.data;
      // console.log(this.newMV.result);
    });
  },
  methods: {
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
      setInterval(() => {
        this.$router.go(0);
      }, 100);
    }
  }
};
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
.new-mv-nav {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
.new-mv-list {
  width: 100%;

  .list-mv {
    width: 25%;
    min-height: 250px;
    float: left;
    padding: 20px 10px;

    .list-mv-img {
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
      width: 100%;
      position: absolute;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #f3f3f3;
      line-height: 30px;
      font-size: 13px;
      padding: 0 10px;
      display: none;
    }

    .list-mv-name {
      line-height: 25px;
      font-size: 14px;
    }
    .list-mv-artistName {
      font-size: 12px;
      font-weight: 200;
      line-height: 25px;
    }
  }
}
</style>