// "Photos" toolbar button: pick several images at once, insert them as plain markdown images.
CMS.registerEditorComponent({
  id: 'images',
  label: 'Photos',
  icon: 'photo_library',
  fields: [{ name: 'images', label: 'Photos', widget: 'image', multiple: true }],
  // Never matches: inserted images stay ordinary markdown (no re-edit as one block, no rewrites of existing posts).
  pattern: /(?!)/,
  toBlock: ({ images = [] }) => images.map((src) => `![](${src})`).join('\n\n'),
  toPreview: ({ images = [] }) => images.map((src) => `<img src="${src}" alt="">`).join(''),
});
