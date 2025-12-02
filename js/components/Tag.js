import {courseTypes} from '../mock.js';

export function Tag({ type, text }) {
  const el = document.createElement("div");
  el.className = "tag";
  el.innerHTML = `${text}`;

  switch (type) {
    case courseTypes.marketing:
      el.classList.add('tag_green');
      break;
    case courseTypes.management:
      el.classList.add('tag_blue');
      break;
    case courseTypes.recruting:
      el.classList.add('tag_orange');
      break;
    case courseTypes.design:
      el.classList.add('tag_red');
      break;
    case courseTypes.development:
      el.classList.add('tag_violet');
      break;
    default:
      el.classList.add('tag_green');
      break;
  }

  return el;
}