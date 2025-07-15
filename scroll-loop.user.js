// ==UserScript==
// @name         Auto Scroll + Refresh Loop (nodeloc.cc)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  自动滚动到底部后刷新，回到顶部继续，循环进行。带有悬浮控制面板，显示运行时间和循环次数。
// @match        https://nodeloc.cc
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SCROLL_STEP_DIVISOR = 4000;
    const SCROLL_INTERVAL = 1000;
    const AUTO_SCROLL_KEY = "autoScrollEnabled";
    const LOOP_COUNT_KEY = "scrollLoopCount";

    let i = 0;
    let interval = null;
    let timerInterval = null;
    let startTime = null;

    // 初始化循环计数
    if (!localStorage.getItem(LOOP_COUNT_KEY)) {
        localStorage.setItem(LOOP_COUNT_KEY, "0");
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? hrs + "小时 " : ""}${mins}分 ${secs}秒`;
    }

    // 插入悬浮控制面板
    function insertControlPanel() {
        const panel = document.createElement('div');
        panel.id = "scrollControlPanel";
        panel.style.position = "fixed";
        panel.style.bottom = "20px";
        panel.style.right = "20px";
        panel.style.zIndex = "9999";
        panel.style.background = "rgba(0,0,0,0.75)";
        panel.style.color = "#fff";
        panel.style.padding = "10px 15px";
        panel.style.borderRadius = "8px";
        panel.style.fontSize = "14px";
        panel.style.fontFamily = "sans-serif";
        panel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";

        const countDisplay = document.createElement('div');
        countDisplay.id = "loopCount";
        countDisplay.textContent = `循环次数: ${localStorage.getItem(LOOP_COUNT_KEY)}`;

        const timeDisplay = document.createElement('div');
        timeDisplay.id = "runTime";
        timeDisplay.textContent = `运行时间: 0秒`;

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
                location.reload(); // 重新载入开始滚动
            }
        };

        panel.appendChild(countDisplay);
        panel.appendChild(timeDisplay);
        panel.appendChild(toggleBtn);
        document.body.appendChild(panel);
    }

    function isAutoScrollEnabled() {
        return localStorage.getItem(AUTO_SCROLL_KEY) === "true";
    }

    function updateLoopCountDisplay() {
        const display = document.getElementById("loopCount");
        if (display) {
            display.textContent = `循环次数: ${localStorage.getItem(LOOP_COUNT_KEY)}`;
        }
    }

    function startRunTimeCounter() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const display = document.getElementById("runTime");
            if (display) {
                display.textContent = `运行时间: ${formatTime(elapsed)}`;
            }
        }, 1000);
    }

    function stopRunTimeCounter() {
        clearInterval(timerInterval);
    }

    function startAutoScroll() {
        i = 0;
        startRunTimeCounter();
        interval = setInterval(() => {
            let scrollStep = document.body.scrollHeight / SCROLL_STEP_DIVISOR;
            let scrollY = scrollStep * i;
            window.scrollTo(0, scrollY);
            i++;

            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                clearInterval(interval);
                stopRunTimeCounter();

                let count = parseInt(localStorage.getItem(LOOP_COUNT_KEY)) || 0;
                localStorage.setItem(LOOP_COUNT_KEY, count + 1);

                updateLoopCountDisplay();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }, SCROLL_INTERVAL);
    }

    function stopAutoScroll() {
        if (interval) clearInterval(interval);
        stopRunTimeCounter();
    }

    function init() {
        insertControlPanel();
        if (isAutoScrollEnabled()) {
            setTimeout(() => {
                startAutoScroll();
            }, 1000);
        }
    }

    window.addEventListener('load', init);
})();
