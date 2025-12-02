import {Tag} from './Tag.js';

export function CourseCard(data) {
  const el = document.createElement("div");
  el.className = "courseCard";
  el.innerHTML = `
    <div class="courseCard__img">
      <img src="${data.img}" alt="courseCard-img" />
    </div>
    <div class="courseCard__content">
      <p class="courseCard__title">${data.title}</p>
      <div class="courseCard__info">
         <span class="courseCard__price">$${data.price}</span> | <span class="courseCard__author">${data.author}</span>
      </div>
    </div>
  `;
  el.querySelector(".courseCard__content").prepend(Tag({type: data.id, text: data.tagText}));
  return el;
}
