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
      <div @click="toggleAll" class="all_div">
        <div class="all_div">
          <icon class="checkbox_all" size="16" :type="completedAll?'success':'circle'"/>
          <span class="all_span">全选</span>
        </div>
          <span class="clear-completed" v-show="hasCompleted" @click="delAllCompleted">清除已完成</span>
      </div>
        <div class="todos">
          <ul class="todo-list">
            <li
              class="item"
              :class="{completed:item.completed}"
              v-for="(item,index) in filterTodos"
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
        <span>{{getRemaining}} 项代办</span>
        <div class="filters">
          <div :class="{active_todo: filterText==='all'}" @click="filterText='all'">全部</div>
          <div :class="{active_todo: filterText==='active'}" @click="filterText='active'" class="fliters_center">进行中</div>
          <div :class="{active_todo: filterText==='completed'}" @click="filterText='completed'">已完成</div>
        </div>

      </footer>
    </template>
    <div class="all_completed" v-else>您已经完成所有任务清单！</div>
  </div>
</template>
<script>
import { formatTime } from '@/utils/index'
export default {
  data () {
    return {
      message: 'todos',
      newTodo: '',
      todos: mpvuePlatform === 'my' ? mpvue.getStorageSync({key: 'todos'}).data || [] : mpvue.getStorageSync('todos') || [],
      logs: mpvuePlatform === 'my' ? mpvue.getStorageSync({key: 'logs'}).data || [] : mpvue.getStorageSync('logs') || [],
      edit: null,
      isFocus: false,
      oldTitle: '',
      handleCompletedAll: false,
      filterText: 'all'
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
    },
    filterTodos () {
      const { filterText, todos } = this
      switch (filterText) {
        case 'all':
          console.log('todos')
          return todos
        case 'active':
          return todos.filter((item) => !item.completed)
        case 'completed':
          return todos.filter((item) => item.completed)
      }
    }
  },
  methods: {
    // 添加todo
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
      this.logs.push({
        title: '添加',
        handletime: formatTime(new Date()),
        name: inputVal
      })
      mpvue.setStorageSync('logs', this.logs)
    },
    // 切换全选
    toggleTodoHandle (index) {
      this.todos[index].completed = !this.todos[index].completed
      this.logs.push({
        title: this.todos[index].completed ? '已完成' : '未完成',
        handletime: formatTime(new Date()),
        name: this.todos[index].title
      })
      mpvue.setStorageSync('logs', this.logs)
    },
    // 删除todo
    handleDel (index) {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确认删除吗?',
        success (res) {
          if (res.confirm) {
            _this.logs.push({
              title: '删除',
              handletime: formatTime(new Date()),
              name: _this.todos[index].title
            })
            mpvue.setStorageSync('logs', _this.logs)
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
    // 删除所有已完成
    delAllCompleted () {
      this.logs.push({
        title: '删除所有已完成',
        handletime: formatTime(new Date()),
        name: this.todos.filter((item) => {
          return item.completed
        })
      })
      mpvue.setStorageSync('logs', this.logs)
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
  margin-top: 30rpx;
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
.all_div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.all_div span {
  font-size: 30rpx;
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
.filters > div {
  color: inherit;
  margin: 3rpx;
  padding: 3rpx 17rpx;
  text-decoration: none;
  border: 1rpx solid transparent;
  border-radius: 13rpx;
}
.filters > .active_todo {
  border-color: #af2f2f33;
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