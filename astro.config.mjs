import { defineConfig } from 'astro/config';

// ⚠️ 部署前请改成你的 GitHub 用户名和仓库名（见 SETUP.md 第 2 步）
const site = 'https://z-orzi.github.io';
const base = '/OurCatsLiveForever';

// 自动给 Markdown 正文中的站内图片（/images/... 开头的路径）加上 base 前缀。
// 投稿者只需写 ![]( /images/昵称/照片.jpg )，无需知道部署路径。
// 注意：只处理 Markdown ![]() 语法，不支持裸 HTML <img> 标签。
function rehypePrefixImages() {
  const walk = (node) => {
    if (
      node.type === 'element' &&
      node.tagName === 'img' &&
      typeof node.properties?.src === 'string' &&
      node.properties.src.startsWith('/')
    ) {
      node.properties.src = base + node.properties.src;
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site,
  base,
  markdown: {
    rehypePlugins: [rehypePrefixImages],
  },
});
