export const courseTypes = {
  all: 'all',
  marketing: 'marketing',
  management: 'management',
  recruting: 'recruting',
  design: 'design',
  development: 'development',
}

export const coursesMock = [
  {
    id: courseTypes.marketing,
    img: 'assets/images/1.jpg',
    tagText: 'Marketing',
    title: "The Ultimate Google Ads Training Course",
    author: "by Jerome Bell",
    price: 100
  },
  {
    id: courseTypes.management,
    img: 'assets/images/2.jpg',
    tagText: 'Management',
    title: "Prduct Management Fundamentals",
    author: "by Marvin McKinney",
    price: 480
  },
  {
    id: courseTypes.recruting,
    img: 'assets/images/3.jpg',
    tagText: 'HR & Recruting',
    title: "HR  Management and Analytics",
    author: "by Leslie Alexander Li",
    price: 200
  },
  {
    id: courseTypes.marketing,
    img: 'assets/images/4.jpg',
    tagText: 'Marketing',
    title: "Brand Management & PR Communications",
    author: "by Kristin Watson",
    price: 530
  },
  {
    id: courseTypes.management,
    img: 'assets/images/5.jpg',
    tagText: 'Management',
    title: "Graphic Design Basic",
    author: "by Guy Hawkins",
    price: 500
  },
  {
    id: courseTypes.management,
    img: 'assets/images/6.jpg',
    tagText: 'Management',
    title: "Business Development Management",
    author: "by Dianne Russell",
    price: 400
  },
  {
    id: courseTypes.development,
    img: 'assets/images/7.jpg',
    tagText: 'Development',
    title: "Highload Software Architecture",
    author: "by Brooklyn Simmons",
    price: 600
  },
  {
    id: courseTypes.recruting,
    img: 'assets/images/8.jpg',
    tagText: 'HR & Recruting',
    title: "Human Resources – Selection and Recruitment",
    author: "by Kathryn Murphy",
    price: 150
  },
  {
    id: courseTypes.design,
    img: 'assets/images/9.jpg',
    tagText: 'Design',
    title: "User Experience. Human-centered Design",
    author: "by Cody Fisher",
    price: 240
  },
]

export const tabsMock = [
  {
    id: courseTypes.all,
    text: 'All',
    count: coursesMock.length,
    active: true,
  },
  {
    id: courseTypes.marketing,
    text: 'Marketing',
    count: 4
  },
  {
    id: courseTypes.management,
    text: 'Management',
    count: coursesMock.filter(el => el.id === courseTypes.management).length,
  },
  {
    id: courseTypes.recruting,
    text: 'HR & Recruting',
    count: coursesMock.filter(el => el.id === courseTypes.recruting).length,
  },
  {
    id: courseTypes.design,
    text: 'Design',
    count: coursesMock.filter(el => el.id === courseTypes.design).length,
  },
  {
    id: courseTypes.development,
    text: 'Development',
    count: coursesMock.filter(el => el.id === courseTypes.development).length,
  },
];