<template>
  <div class="container_app" id="app">
    <header class="header">
      <image class="plus" src="/static/images/plus.png"/>
      <input
        class="new-todo"
        placeholder="输入文字添加代办事项"
        v-model="newTodo"
        autofocus
        @confirm="handleadd"
      >
    </header>
    <template v-if="todos.length > 0">
      <div @click="toggleAll">
          <icon class="checkbox_all" size="16" :type="completedAll?'success':'circle'"/>
          <span>全选</span>
      </div>
        <div class="todos">
          <ul class="todo-list">
            <li
              class="item"
              :class="{completed:item.completed}"
              v-for="(item,index) in todos"
              :key="index"
              @click="toggleTodoHandle(index)"
            >
              <icon class="checkbox" size="16" :type="item.completed?'success':'circle'"/>
              <span class="name">{{ item.title }}</span>
              <icon class="remove" type="clear" size="16" @click="handleDel(index)"/>
            </li>
          </ul>
        </div>
      <footer class="footer">
        <span>{{getRemaining}}项代办</span>
        <div class="filters">
          <div>全部</div>
          <div class="fliters_center">进行中</div>
          <div>已完成</div>
        </div>
        <span class="clear-completed" v-show="hasCompleted" @click="delAllCompleted">清除已完成</span>
      </footer>
    </template>
    <div class="all_completed" v-else>您已经完成所有任务清单！</div>
  </div>
</template>
<script>
// const todos = [
//   {
//     id: 1,
//     title: '吃饭',
//     completed: false
//   },
//   {
//     id: 2,
//     title: '睡觉',
//     completed: false
//   },
//   {
//     id: 3,
//     title: '抽烟',
//     completed: true
//   }
// ]
// if (mpvuePlatform === 'my') {
//   todos = mpvue.getStorageSync({key: 'todos'}).data || []
//   mpvue.setStorageSync({
//     key: 'logs',
//     data: todos
//   })
// } else {
//   todos = mpvue.getStorageSync('todos') || []
//   todos.unshift(Date.now())
//   mpvue.setStorageSync('todos', todos)
// }
export default {
  data () {
    return {
      message: 'todos',
      newTodo: '',
      todos: mpvue.getStorageSync('todos') || [],
      edit: null,
      isFocus: false,
      oldTitle: '',
      handleCompletedAll: false
    }
  },
  watch: {
    todos: {
      handler () {
        mpvue.setStorageSync('todos', this.todos)
      },
      deep: true // deep 配置为 true 表示深度监视
    }
  },
  computed: {
    completedAll () {
      return this.todos.every((item) => item.completed)
    },
    hasCompleted () {
      return this.todos.some((item) => {
        return item.completed
      })
    },
    getRemaining () {
      return this.todos.filter((item) => {
        return !item.completed
      }).length
    }
  },
  methods: {
    handleadd () {
      const inputVal = this.newTodo
      if (inputVal.length === 0) {
        return
      }
      this.todos.push({
        id: Math.random(),
        title: inputVal,
        completed: false
      })
      this.newTodo = ''
    },
    toggleTodoHandle (index) {
      this.todos[index].completed = !this.todos[index].completed
    },
    handleDel (index) {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确认删除吗?',
        success (res) {
          if (res.confirm) {
            _this.todos.splice(index, 1)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    toggleAll () {
      this.handleCompletedAll = !this.handleCompletedAll
      this.todos.forEach((item) => {
        item.completed = this.handleCompletedAll
      })
    },
    delAllCompleted () {
      this.todos = this.todos.filter((item) => {
        return !item.completed
      })
    }
  }
}
</script>
<style scoped>
.container_app {
  padding: 30rpx;
  border-top: 1rpx solid #e5e5e5;
}
.header {
  display: flex;
  align-items: center;
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
  margin-bottom: 30rpx;
  padding: 20rpx;
}
.new-todo {
  flex: 1;
  font-size: 28rpx;
}
.header .plus {
  width: 41rpx;
  height: 41rpx;
  margin-right: 20rpx;
}

.todos {
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
}
.todos .item {
  display: flex;
  align-items: center;
  padding: 25rpx;
  border-bottom: 1rpx solid #e0e0e0;
}
.todos .item .checkbox {
  margin-right: 20rpx;
}
.todos .item .name {
  flex: 1;
  font-size: 30rpx;
  color: #444;
}
.todos .item.completed .name {
  text-decoration: line-through;
  color: #888;
}
.filters {
  font-size: 30rpx;
  display: flex;
  margin-bottom: 20rpx;
  padding: 0 10rpx;
}
.fliters_center {
  margin: 0 10rpx;
}
.checkbox_all {
  margin: 0 20rpx;
}
.footer {
  margin-top: 20rpx;
  padding: 0 10rpx;
  display: flex;
  justify-content: space-between;
  font-size: 30rpx;
}
.all_completed {
  text-align: center;
  line-height: 300rpx;
}
</style>