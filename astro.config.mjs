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

// 把"文字段落 + 紧随其后的图片段落"包成一个 pair 容器，
// 交替加 pair-r（文字左图右）/ pair-l（图左文字右）类，配合 CSS 实现图文一左一右。
function rehypePairImages() {
  return (tree) => {
    const isImgP = (node) =>
      node?.type === 'element' && node.tagName === 'p' &&
      node.children?.length === 1 &&
      node.children[0].type === 'element' && node.children[0].tagName === 'img';
    const isTextP = (node) =>
      node?.type === 'element' && node.tagName === 'p' && !isImgP(node);
    const kids = tree.children;
    const out = [];
    let n = 0;
    for (let i = 0; i < kids.length; i++) {
      const node = kids[i];
      if (node.type === 'text') { out.push(node); continue; }
      // 找下一个元素节点（跳过段落之间的空白文本节点）
      let j = i + 1;
      while (j < kids.length && kids[j].type === 'text') j++;
      const next = kids[j];
      if (isTextP(node) && isImgP(next)) {
        n += 1;
        next.properties.className = ['pic'];
        out.push({
          type: 'element',
          tagName: 'div',
          properties: { className: [n % 2 ? 'pair-r' : 'pair-l'] },
          children: [node, next],
        });
        i = j; // 文字和图片都已并入配对，跳过
      } else {
        out.push(node);
      }
    }
    tree.children = out;
  };
}

export default defineConfig({
  site,
  base,
  markdown: {
    rehypePlugins: [rehypePrefixImages, rehypePairImages],
  },
});
