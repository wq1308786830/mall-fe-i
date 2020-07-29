/**
 * a tool to capture html content.
 */
import html2canvas from 'html2canvas';

const capture = async (node, ignoreElements = []) => {
  const canvasElement = await html2canvas(node, {
    scale: 1,
    /**
     * canvas element attribute width and height.
     * Caution: there are content length limitation with different browsers & operation systems & hardware.
     */
    height: node.scrollHeight, // canvas element attribute height
    useCORS: true, // allow cors sources
    ignoreElements, // element need to be ignored in canvas
  });
  return canvasElement.toDataURL('image/png');
};

// 加载图片工具
const loadImg = imgUrl => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = e => {
      reject(e);
    };
  });
};

export { loadImg };

export default {
  capture,
};
