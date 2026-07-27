# CSS Cheat Sheet / CSS 速查表

🎨 一份全面的 CSS 速查表 —— 选择器、属性、@规则、值类型与单位，支持浏览器兼容性筛选与搜索。

A comprehensive CSS reference covering selectors, properties, at-rules, values, and units, with browser compatibility filtering and search.

**在线演示 / Live Demo**: [GitHub Pages（待部署）](https://wh1tea.github.io/css-cheat-sheet/)

## 特性 / Features

- 📚 **全面覆盖** — 选择器、属性、@规则、值类型、单位，含现代 CSS 特性（Grid、Container Queries、:has()、CSS Layers、OKLCH 等）
- 🌐 **浏览器兼容标记** — Chrome / Firefox / Safari 兼容性一目了然
- 🔍 **实时搜索** — 按名称或描述搜索，快捷键 `Ctrl+K`
- 🌓 **深色/浅色主题** — 一键切换，偏好自动保存
- 📋 **一键复制** — 悬停点击即可复制属性名
- 📱 **响应式设计** — 桌面到移动端均可使用
- 🚀 **零依赖** — 纯 HTML / CSS / JavaScript，无需构建工具
- 🌏 **双语** — 中文 + English 对照

## 项目结构 / Project Structure

```
css-cheat-sheet/
├── index.html          # 入口文件
├── css/
│   └── style.css       # 样式（响应式 + 主题）
├── js/
│   └── app.js          # 应用逻辑
├── data/
│   └── css-data.json   # CSS 数据（所有条目）
├── README.md           # 本文件
├── LICENSE             # MIT 许可证
└── TODO.md             # 下一步优化建议
```

## 快速开始 / Quick Start

直接打开 `index.html` 即可使用。无需安装、无需构建。

```bash
# 克隆仓库
git clone https://github.com/wh1tea/css-cheat-sheet.git
cd css-cheat-sheet

# 直接打开
open index.html     # macOS
start index.html    # Windows
xdg-open index.html # Linux
```

## 数据格式 / Data Format

所有数据存储在 `data/css-data.json`，结构如下：

```json
{
  "sections": [
    {
      "id": "selectors",
      "name": "选择符",
      "nameEn": "Selectors",
      "color": "#ffce54",
      "groups": [
        {
          "name": "元素选择符",
          "nameEn": "Element Selectors",
          "items": [
            {
              "name": "E",
              "desc": "类型选择符",
              "descEn": "Type selector",
              "url": "https://...",
              "support": {
                "chrome": "yes",
                "firefox": "yes",
                "safari": "yes"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

**浏览器兼容性级别 / Browser Support Levels**:

- `yes` — 完全支持
- `partial` — 部分支持
- `no` — 不支持
- 省略字段 = 默认完全支持

欢迎通过 Pull Request 补充或修正数据！

## 致谢 / Credits

- 数据参考自 [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- 灵感来源于 [CSS Cheat Sheet](http://code.ciaoca.com/style/css-cheat-sheet/)

## 许可证 / License

MIT © [wh1tea](https://github.com/wh1tea)
