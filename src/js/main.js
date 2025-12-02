import {TabItem} from './components/TabItem.js';
import {Header} from './components/Header.js';
import {coursesMock, courseTypes, tabsMock} from './mock.js';
import {Panel} from './blocks/Panel.js';
import {Search} from './components/Search.js';
import {reactive} from './utils/reactive.js';
import {debounce} from './utils/debounce.js';
import {Courses} from './blocks/Courses.js';
import {CourseCard} from './components/CourseCard.js';
import {Container} from './components/Container.js';

const content = document.getElementById("content");
let panel;
let tabBar;

document.body.prepend(Header());

content.appendChild(Panel());
panel = document.getElementById("panel");
tabBar = document.getElementById("tabBar");

// TabBar render
tabsMock.forEach((tab) => {
  tabBar.appendChild(
    TabItem(tab)
  );
})

panel.appendChild(Search());

// Courses render
const stateCourses = {courses: [...coursesMock]};
const state = reactive(stateCourses, renderCourses);
function renderCourses() {
  const coursesRoot = Courses(state.courses);
  state.courses.forEach((course) => coursesRoot.appendChild(CourseCard(course)));
  document.getElementById('courseRoot')?.remove();
  const container = Container(coursesRoot);
  content.appendChild(container);
  const loadMoreButton = document.getElementById('loadMore');
  if (state.courses.length === 0) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
}
renderCourses();

// OnClick tabs
const tabs = document.querySelectorAll('.tab');
const searchInput = document.getElementById('search');

tabs.forEach((tab) => {tab.addEventListener('click', onClickTab)})

const resetTabs = () => {
  tabs.forEach((tab) => tab.classList.remove('tab_active'));
  [...tabs].find(el => el.id === courseTypes.all).classList.add('tab_active');
}

function onClickTab(event) {
  const id = event.currentTarget.id;
  searchInput.value = '';
  tabs.forEach((tab) => tab.classList.remove('tab_active'));
  event.currentTarget.classList.add('tab_active');
  if (id === courseTypes.all) {
    state.courses = coursesMock;
    return;
  }
  state.courses = coursesMock.filter(course => course.id === id);
}

// Search
const handleSearch = debounce((value) => {
  resetTabs();
  state.courses = coursesMock.filter(course => course.title.toLowerCase().includes(value.toLowerCase()));
})

const onChangeSearch = (event) => {
  const value = event.currentTarget.value;
  handleSearch(value);
}

searchInput.addEventListener('input', onChangeSearch);






