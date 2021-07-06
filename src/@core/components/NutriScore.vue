<template>
  <span
    class="d-flex align-items-center"
  >
    <div
      class="score score-1"
      :class="{ active: nutritionalInfo == 'a' || nutritionalInfo == 0}"
    >
      A
    </div>
    <div
      class="score score-2"
      :class="{ active: nutritionalInfo == 'b' || nutritionalInfo == 1}"
    >
      B
    </div>
    <div
      class="score score-3"
      :class="{ active: nutritionalInfo == 'c' || nutritionalInfo == 2}"
    >
      C
    </div>
    <div
      class="score score-4"
      :class="{ active: nutritionalInfo == 'd' || nutritionalInfo == 3}"
    >
      D
    </div>
    <div
      class="score score-5"
      :class="{ active: nutritionalInfo == 'e' || nutritionalInfo == 4}"
    >
      E
    </div>
  </span>
</template>

<script>
export default {
  props: {
    nutritionalInfo: {
      type: [Number, String],
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.score {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  color: rgba(white, 0.8);
  font-size: 10px;
}
.active {
  width: 20px;
  height: 25px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: white;
  font-weight: 700;
  font-size: 13px;
  border-radius: 7px !important;
}

.score-1 {
  background: #037d3f;
  border-radius: 4px 0 0 4px;
}
.score-2 {
  background: #81b52e;
}
.score-3 {
  background: #f6c502;
}
.score-4 {
  background: #e77d00;
}
.score-5 {
  background: #df3c10;
  border-radius: 0 4px 4px 0;
}
</style>
