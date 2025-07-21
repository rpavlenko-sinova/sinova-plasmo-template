export const getPageInfo = () => {
  return {
    title: document.title,
    url: window.location.href,
    domain: window.location.hostname,
  };
};
