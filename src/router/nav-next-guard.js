
const DEFAULT_TITLE = 'COVID-19 in the United States'
export const navNextGuard = (to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
}
