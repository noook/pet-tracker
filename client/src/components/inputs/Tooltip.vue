<template>
  <div class="tooltip">
    <span>&#63;</span>
    <div class="info" v-html="toParagraph(text)"></div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: ['text'],
  methods: {
    toParagraph(text) {
      return `<p>${text}</p>`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .tooltip {
    position: relative;
    margin: 0 5px;
    width: .6rem;
    height: .6rem;
    padding: 3px;
    border-radius: 100%;
    background-color: #3b3b3b;
    @include d-flex-centered(center);

    > span {
      font-size: .6rem;
      display: inline-block;
      text-align: center;
      color: #fff;
    }

    > .info {
      display: none;
    }

    &:hover {
      cursor: pointer;

      > .info {
        display: flex;
        position: absolute;
        width: 100%;

        /deep/ p {
          margin-top: 20px;
          position: absolute;
          left: calc(-150px / 2);
          min-width: 150px;;
          max-width: 300px;
          font-size: .8rem;
          background-color: #3b3b3b;
          color: white;
          border-radius: 10px;
          padding: 10px;

          &:before {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0px;
            height: 0px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #2f2f2f;
          }
        }
      }
    }
  }
</style>
