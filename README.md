# nodeloc-auto-scroll

一个专为 [nodeloc.cc](https://nodeloc.cc/t/topic/32583/1428) 页面开发的油猴（Tampermonkey）用户脚本，具备以下功能：

- 自动缓慢向下滚动页面
- 到达底部后自动刷新页面
- 页面刷新后自动从顶部重新开始滚动
- 悬浮控制面板，提供：
  - 当前循环次数统计
  - 启动 / 停止 滚动的按钮

---

## 🚀 使用方法

1. 安装 [Tampermonkey 插件](https://www.tampermonkey.net/)
2. 创建一个新用户脚本
3. 将 [`scroll-loop.user.js`](./scroll-loop.user.js) 的代码粘贴进去
4. 保存并启用该脚本
5. 打开目标页面：[https://nodeloc.cc/t/topic/32583/1428](https://nodeloc.cc/t/topic/32583/1428)
6. 点击页面右下角的“开始滚动”按钮即可自动循环

---

## 📦 脚本安装

你也可以直接点击下面链接安装脚本：

👉 [一键安装脚本](https://raw.githubusercontent.com/你的用户名/你的仓库名/main/scroll-loop.user.js)

> ⚠️ 注意：此链接需在 HTTPS 协议下使用，且你需要提前安装 Tampermonkey 插件。

---

## 📌 功能说明

- **滚动速度**：每秒滚动一次，滚动步长为页面高度的 1/4000
- **自动刷新**：滚动到底部后延迟 1 秒自动刷新
- **自动重启**：刷新后从顶部继续下一轮滚动
- **控制面板**：页面右下角悬浮窗，随时可以开始或停止自动滚动

---

## 📄 许可协议

本项目采用 MIT 开源许可证，详情请见 [`LICENSE`](./LICENSE)。
