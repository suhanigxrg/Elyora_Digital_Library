// src/data/books.js
const books = {
  "starlit-guide": {
    id: "starlit-guide",
    title: "The Starlit Guide",
    author: "A. Sharma",
    cover: "/imgs/starlit-guide.png",
    totalChapters: 3,
    rating: 4.8,
    description: "A mysterious novel about lighthouses, lost books and ancient symbols.",
    chapters: {
      1: { title: "Chapter 1: The Beginning", subtitle: "The journey starts", content: [
        "In the beginning, there was only darkness and the whisper of ancient winds across forgotten lands...",
        "Sarah had always been drawn to mysteries, but nothing could have prepared her for what she would discover in the old lighthouse.",
        "The keeper's warnings echoed in her mind as she climbed the spiral staircase.",
        "At the top of the lighthouse, she found something that would change everything."
      ]},
      2: { title: "Chapter 2: Ancient Whispers", subtitle: "Echoes of the past", content: [
        "The book found in the lighthouse attic was bound in midnight blue leather...",
        "Symbols shimmered in the candlelight.",
        "Whispers of forgotten languages filled the air.",
        "The keeper warned her about the attic."
      ]},
      3: { title: "Chapter 3: The Revelation", subtitle: "A secret revealed", content: [
        "The symbols formed a map.",
        "The lighthouse was a guardian of ancient knowledge.",
        "Sarah opened the final page of the mysterious book.",
        "Her destiny awaited."
      ]}
    }
  },

  "business-tactics": {
    id: "business-tactics",
    title: "Business Tactics",
    author: "R. Mehta",
    cover: "/imgs/business-tactics.png",
    totalChapters: 4,
    rating: 4.6,
    description: "Practical business strategies for modern teams.",
    chapters: {
      1: { title: "Chapter 1: Market Strategies", subtitle: "Understanding the market", content: [
        "In today's competitive business environment, understanding market dynamics is crucial...",
        "Successful companies don't just follow trends - they create them."
      ]},
      2: { title: "Chapter 2: Leadership Principles", subtitle: "Effective leadership strategies", content: [
        "Great leaders inspire their teams to achieve extraordinary results...",
        "Leadership is not about authority, but about influence and vision."
      ]},
      3: { title: "Chapter 3: Financial Management", subtitle: "Managing business finances", content: [
        "Financial health is the lifeblood of any successful business...",
        "Cash flow management can make or break a company."
      ]},
      4: { title: "Chapter 4: Growth Strategies", subtitle: "Scaling your business", content: [
        "Sustainable growth requires careful planning and execution...",
        "Understanding your core competencies is key to successful scaling."
      ]}
    }
  },

  "self-mastery": {
    id: "self-mastery",
    title: "Self Mastery",
    author: "L. Kaur",
    cover: "/imgs/self-mastery.png",
    totalChapters: 3,
    rating: 4.7,
    description: "A guide to personal growth and habit formation.",
    chapters: { 1:{ title:"Chapter 1: Self-Awareness", subtitle:"Understanding yourself", content:["The journey to self-mastery begins with self-awareness..."] }, 2:{ title:"Chapter 2: Emotional Regulation", subtitle:"Managing your emotions", content:["Emotional intelligence is the cornerstone of self-mastery..."] }, 3:{ title:"Chapter 3: Habit Formation", subtitle:"Building positive habits", content:["Lasting change comes from consistent small actions..."] } }
  },

  "atomic-habits": {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/imgs/atomic-habits.png",
    totalChapters: 5,
    rating: 4.9,
    description: "Tiny changes, remarkable results.",
    chapters: { 1:{ title:"Chapter 1: The Surprising Power of Atomic Habits", subtitle:"Small habits make a big difference", content:["Habits are the compound interest of self-improvement..."] } }
  },

  "psychology-money": {
    id: "psychology-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/imgs/psycology-of-money.png",
    totalChapters: 4,
    rating: 4.8,
    description: "Insights into human behavior and money.",
    chapters: { 1:{ title:"Intro", subtitle:"", content:["Your personal experiences with money make up..."] } }
  },

  "harry-potter": {
    id: "harry-potter",
    title: "Harry Potter",
    author: "J.K. Rowling",
    cover: "/imgs/harry-porter.png",
    totalChapters: 3,
    rating: 4.9,
    description: "The classic magical adventure.",
    chapters: { 1:{ title:"Chapter 1: The Boy Who Lived", subtitle:"The beginning of the story", content:["Mr. and Mrs. Dursley, of number four..."] } }
  }
};

export default books;
