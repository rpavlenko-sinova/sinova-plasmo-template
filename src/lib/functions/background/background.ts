export const background = () => {
  chrome.runtime.getURL('icon.png');
  return 'this function meant to be used only in background scripts';
};
