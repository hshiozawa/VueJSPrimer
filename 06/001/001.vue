<template>
  <p class="message">メッセージ: {{ msg }}</p>
</template>

<script>
export default {
  data() {
    return {msg: 'こんにちは!'}
  }
}
</script>

<style>
.message {
  color: #42b938;
}
</style>
