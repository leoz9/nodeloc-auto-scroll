// ==UserScript==
// @name         Auto Scroll + Refresh Loop (nodeloc.cc)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动滚动到底部后刷新，回到顶部继续，附带悬浮控制面板。
// @match        https://nodeloc.cc/t/topic/32583/1428
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SCROLL_STEP_DIVISOR = 4000; // 控制滚动速度
    const SCROLL_INTERVAL = 1000; // 每秒滚动一次
    const AUTO_SCROLL_KEY = "autoScrollEnabled";
    const LOOP_COUNT_KEY = "scrollLoopCount";

    let i = 0;
    let interval = null;

    // 初始化 loop 计数
    if (!localStorage.getItem(LOOP_COUNT_KEY)) {
        localStorage.setItem(LOOP_COUNT_KEY, "0");
    }

    // 插入控制面板
    function insertControlPanel() {
        const panel = document.createElement('div');
        panel.id = "scrollControlPanel";
        panel.style.position = "fixed";
        panel.style.bottom = "20px";
        panel.style.right = "20px";
        panel.style.zIndex = "9999";
        panel.style.background = "rgba(0,0,0,0.7)";
        panel.style.color = "#fff";
        panel.style.padding = "10px 15px";
        panel.style.borderRadius = "8px";
        panel.style.fontSize = "14px";
        panel.style.fontFamily = "sans-serif";
        panel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";

        const countDisplay = document.createElement('div');
        countDisplay.id = "loopCount";
        countDisplay.textContent = `循环次数: ${localStorage.getItem(LOOP_COUNT_KEY)}`;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = isAutoScrollEnabled() ? "停止滚动" : "开始滚动";
        toggleBtn.style.marginTop = "10px";
        toggleBtn.style.padding = "5px 10px";
        toggleBtn.style.border = "none";
        toggleBtn.style.borderRadius = "4px";
        toggleBtn.style.cursor = "pointer";
        toggleBtn.style.backgroundColor = "#4CAF50";
        toggleBtn.style.color = "#fff";

        toggleBtn.onclick = () => {
            if (isAutoScrollEnabled()) {
                localStorage.removeItem(AUTO_SCROLL_KEY);
                toggleBtn.textContent = "开始滚动";
                stopAutoScroll();
            } else {
                localStorage.setItem(AUTO_SCROLL_KEY, "true");
                toggleBtn.textContent = "停止滚动";
                location.reload(); // 刷新后自动开始
            }
        };

        panel.appendChild(countDisplay);
        panel.appendChild(toggleBtn);
        document.body.appendChild(panel);
    }

    // 是否启用自动滚动
    function isAutoScrollEnabled() {
        return localStorage.getItem(AUTO_SCROLL_KEY) === "true";
    }

    // 更新循环次数显示
    function updateLoopCountDisplay() {
        const display = document.getElementById("loopCount");
        if (display) {
            display.textContent = `循环次数: ${localStorage.getItem(LOOP_COUNT_KEY)}`;
        }
    }

    // 开始滚动逻辑
    function startAutoScroll() {
        i = 0;
        interval = setInterval(() => {
            let scrollStep = document.body.scrollHeight / SCROLL_STEP_DIVISOR;
            let scrollY = scrollStep * i;
            window.scrollTo(0, scrollY);
            i++;

            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                // 到底部了，刷新页面
                clearInterval(interval);

                let count = parseInt(localStorage.getItem(LOOP_COUNT_KEY)) || 0;
                localStorage.setItem(LOOP_COUNT_KEY, count + 1);

                updateLoopCountDisplay();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }, SCROLL_INTERVAL);
    }

    // 停止滚动
    function stopAutoScroll() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // 初始化页面
    function init() {
        insertControlPanel();

        if (isAutoScrollEnabled()) {
            setTimeout(() => {
                startAutoScroll();
            }, 1000); // 等待页面加载完再开始
        }
    }

    window.addEventListener('load', init);
})();
