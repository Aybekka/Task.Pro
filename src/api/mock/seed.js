// Backend hazır olana kadar uygulamayı boş ekranla test etmemek için sabit demo veri koydum
export const DEMO_USER = {
  id: "user-1",
  name: "Ivetta",
  email: "demo@taskpro.com",
  password: "Demo1234",
  avatarUrl: null,
};

export const DEMO_BOARDS = [
  {
    id: "board-1",
    ownerId: "user-1",
    title: "Project Office",
    icon: "icon-project",
    background: "bg-default",
    columns: [
      {
        id: "col-1",
        title: "To Do",
        cards: [
          {
            id: "card-1",
            title: "Research competitor features",
            description:
              "Analyze top 5 competitor kanban tools and document key features.",
            priority: "low",
            deadline: null,
          },
          {
            id: "card-2",
            title: "Design system audit",
            description:
              "Review existing design tokens and update colour variables.",
            priority: "medium",
            deadline: "2026-06-25",
          },
          {
            id: "card-3",
            title: "Set up CI/CD pipeline",
            description: "",
            priority: "high",
            deadline: "2026-06-20",
          },
        ],
      },
      {
        id: "col-2",
        title: "In Progress",
        cards: [
          {
            id: "card-4",
            title: "Implement authentication flow",
            description:
              "Login, register, and forgot-password screens with validation.",
            priority: "high",
            deadline: "2026-06-21",
          },
          {
            id: "card-5",
            title: "Board CRUD",
            description:
              "Create, edit, delete boards with icon and background selection.",
            priority: "medium",
            deadline: null,
          },
          {
            id: "card-6",
            title: "Theme switcher",
            description:
              "Dark / Light / Violet themes persisted to localStorage.",
            priority: "low",
            deadline: null,
          },
        ],
      },
      {
        id: "col-3",
        title: "Done",
        cards: [
          {
            id: "card-7",
            title: "CRA project scaffolding",
            description:
              "Initialise React + CRA + Router + Redux Toolkit boilerplate.",
            priority: "without",
            deadline: null,
          },
          {
            id: "card-8",
            title: "CSS variable system",
            description:
              "Three-theme token system via data-theme attribute on <html>.",
            priority: "without",
            deadline: null,
          },
          {
            id: "card-9",
            title: "Folder structure",
            description:
              "Organised src/ layout for 6-person team collaboration.",
            priority: "without",
            deadline: null,
          },
        ],
      },
    ],
  },
];
