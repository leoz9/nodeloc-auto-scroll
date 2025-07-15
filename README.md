# nodeloc-auto-scroll 油猴脚本

🌀 自动滚动 + 自动刷新 + 自动循环  
🎛️ 内置悬浮控制面板，可随时启停

---

## 📌 功能简介

该脚本专为 [nodeloc.cc 的长贴页面](https://nodeloc.cc/t/topic/32583/1428) 设计，实现以下自动操作：

- 每秒缓慢向下滚动页面
- 滚动到底部后自动刷新页面
- 刷新后回到顶部并继续滚动
- 页面右下角提供悬浮控制面板：
  - 显示当前循环次数
  - “开始滚动” / “停止滚动” 控制按钮

---

## 🚀 使用方法

1. 安装 [Tampermonkey 插件](https://www.tampermonkey.net/)
2. 新建脚本，粘贴 [`scroll-loop.user.js`](./scroll-loop.user.js) 中的内容
3. 保存并启用脚本
4. 访问页面：[https://nodeloc.cc/t/topic/32583/1428](https://nodeloc.cc/t/topic/32583/1428)
5. 点击右下角按钮开始滚动，循环自动进行

---

## ⚡ 快速安装脚本

👉 [一键安装 scroll-loop.user.js](https://raw.githubusercontent.com/你的用户名/你的仓库名/main/scroll-loop.user.js)

> ✅ 请先确保你已安装 Tampermonkey 插件  
> ⚠️ GitHub Raw 链接必须通过 HTTPS 打开才能直接安装

---

## 🧠 技术说明

- 滚动频率：每 1000 毫秒滚动一次
- 滚动步长：页面高度的 1/4000
- 刷新间隔：滚动到底后延迟 1 秒刷新
- 存储控制：使用 `localStorage` 保留循环状态

---

## 📄 开源许可

本项目基于 [MIT License](./LICENSE) 许可证开源。
