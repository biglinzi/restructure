<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { ElLoading } from 'element-plus'

let pageLoading = ElLoading.service({
  lock: true,
  text: '加载中...',
})
onBeforeUnmount(() => {
  pageLoading.close()
})
</script>
