# 部署教程（仓库创建者看这篇）

## 第 1 步：创建仓库

在 GitHub 新建一个 **Public** 仓库，名字建议用 `catliveforever`（名字会出现在网址里）。
**不要**勾选 "Add a README"（避免上传冲突），建好后先放着。

## 第 2 步：修改两处占位内容

1. `astro.config.mjs`：把 `你的用户名` 改成你的实际用户名（仓库名默认已是 `catliveforever`）
2. `src/pages/index.astro`：搜索 `你的用户名`，把两处 GitHub 链接改成你的仓库地址

## 第 3 步：上传代码

在本模板文件夹中打开终端，依次执行：

```bash
git init
git add .
git commit -m "init: 我们的咪"
git branch -M main
git remote add origin https://github.com/z-orzi/OurCatsLiveForever.git
git push -u origin main
```

（不会用命令行也可以：GitHub 网页上点 "uploading an existing file"，把模板文件拖进去。）

## 第 4 步：开启 GitHub Pages

仓库 → **Settings** → **Pages** → Source 选择 **GitHub Actions**。

回到 **Actions** 标签页，如果部署 workflow 没有自动运行，点一下 "Run workflow"。
绿色对勾出现后，访问：

**https://z-orzi.github.io/OurCatsLiveForever/**

## 第 5 步：测试一篇新故事

随便复制一篇 `src/content/stories/` 里的示例改名提交，确认首页多了一张卡片，说明全链路跑通。🎉

## 日常维护

- 收到 PR → 检查故事内容是否合规 → 合并 → 网站 2~3 分钟后自动更新
- 建议在 Settings → Branches 给 main 分支加保护，要求 PR 才能合并
