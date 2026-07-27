# 下一步优化建议 / TODO

> 以下功能与改进适合后续版本迭代。

## 功能增强

- [ ] **PWA 支持** — 添加 Service Worker 和 manifest.json，支持离线使用
- [ ] **URL 状态同步** — 将当前 section / 搜索词 / 浏览器过滤同步到 URL hash，支持分享链接
- [ ] **示例代码展示** — 点击条目展开或弹出 CSS 代码示例
- [ ] **收藏 / 常用** — 允许用户标记常用属性，本地存储
- [ ] **键盘导航** — 上下键切换条目，Enter 打开 MDN 链接
- [ ] **导出为 PDF** — 一键导出当前筛选结果为 PDF 参考页
- [ ] **多语言切换** — 支持纯中文、纯英文、双语模式切换
- [ ] **CSS 值预览** — 颜色值显示色块预览，渐变显示预览图

## 数据完善

- [ ] **更多现代属性** — CSS Anchor Positioning, View Transitions, @starting-style, @scope, @position-try, @media(dynamic-range), light-dark() 等
- [ ] **浏览器版本号** — 标注首次支持的浏览器版本号
- [ ] **caniuse 集成** — 链接到 caniuse.com 详细数据
- [ ] **CSS 属性语法** — 标注每个属性的值语法（如 `<length> | <percentage>`）
- [ ] **CSS 枚举值** — 列出每个属性的可选值（如 `display: block | inline | flex | grid | ...`）
- [ ] **初始值** — 标注每个属性的默认初始值
- [ ] **是否可继承** — 标注属性是否可继承

## 性能与体验

- [ ] **虚拟滚动** — 大批量条目时使用虚拟滚动提升性能
- [ ] **骨架屏** — 数据加载时显示骨架占位
- [ ] **动画优化** — 使用 `content-visibility: auto` 优化大量卡片渲染
- [ ] **图片优化** — 用 SVG 替代 emoji 以获得跨平台一致性

## 社区与工具链

- [ ] **GitHub Actions CI** — 自动部署到 GitHub Pages
- [ ] **JSON Schema 校验** — 为 css-data.json 添加 schema，PR 自动验证数据格式
- [ ] **数据贡献指南** — 详细的 CONTRIBUTING.md
- [ ] **i18n 工具** — 自动化翻译工作流
- [ ] **VS Code 插件** — 将速查表发布为 VS Code 扩展
- [ ] **CLI 工具** — 终端内快速查询 CSS 属性
