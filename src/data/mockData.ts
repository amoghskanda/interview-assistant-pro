
import { Candidate, JobDescription, TestQuestion } from "@/types";

export const mockJobDescriptions: JobDescription[] = [
  {
    id: "jd1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA (Remote)",
    description: "We're looking for a Senior Frontend Developer with experience in React, TypeScript, and modern web technologies to join our team. You'll be responsible for building responsive web applications and implementing UI/UX designs.",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management libraries",
      "Knowledge of modern CSS and responsive design",
      "Experience with frontend build tools",
    ],
    createdAt: "2023-10-15T12:00:00Z",
  },
  {
    id: "jd2",
    title: "Backend Engineer",
    department: "Engineering",
    location: "New York, NY (Hybrid)",
    description: "We are hiring a Backend Engineer to design and implement scalable APIs and services. You will work with cross-functional teams to deliver high-performance solutions.",
    requirements: [
      "3+ years of experience with Node.js or Python",
      "Experience with SQL and NoSQL databases",
      "Knowledge of RESTful API design",
      "Understanding of serverless architecture",
      "Experience with microservices",
    ],
    createdAt: "2023-11-05T09:30:00Z",
  },
  {
    id: "jd3",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    description: "We're seeking a Product Designer who can create intuitive and engaging user experiences. You'll collaborate with product managers and engineers to design wireframes, prototypes, and final UIs.",
    requirements: [
      "Portfolio demonstrating UI/UX design skills",
      "Experience with Figma or similar design tools",
      "Understanding of user-centered design principles",
      "Ability to conduct user research",
      "Experience working in agile environments",
    ],
    createdAt: "2023-12-01T15:45:00Z",
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    resumeUrl: "/resumes/alex-johnson.pdf",
    matchScore: 92,
    skills: ["React", "TypeScript", "Redux", "Responsive Design", "Jest", "GraphQL"],
    education: [
      {
        institution: "Stanford University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2014-09-01",
        endDate: "2018-06-30"
      }
    ],
    experience: [
      {
        company: "Tech Innovations Inc",
        position: "Senior Frontend Developer",
        startDate: "2021-03-01",
        endDate: null,
        description: "Lead frontend development for multiple products. Implemented design systems, optimized performance, and mentored junior developers."
      },
      {
        company: "WebSolutions Corp",
        position: "Frontend Developer",
        startDate: "2018-07-15",
        endDate: "2021-02-28",
        description: "Developed responsive web applications using React and TypeScript. Collaborated with UX designers to implement pixel-perfect interfaces."
      }
    ],
    tests: [
      {
        id: "t1",
        type: "aptitude",
        name: "Frontend Development Assessment",
        status: "completed",
        score: 88,
        sentAt: "2023-12-05T10:00:00Z",
        completedAt: "2023-12-06T14:30:00Z"
      }
    ]
  },
  {
    id: "c2",
    name: "Samantha Lee",
    email: "samantha.lee@example.com",
    phone: "+1 (555) 234-5678",
    resumeUrl: "/resumes/samantha-lee.pdf",
    matchScore: 88,
    skills: ["React", "JavaScript", "CSS", "HTML", "UI/UX", "Webpack"],
    education: [
      {
        institution: "MIT",
        degree: "Master of Science",
        field: "Human-Computer Interaction",
        startDate: "2016-09-01",
        endDate: "2018-06-30"
      },
      {
        institution: "UCLA",
        degree: "Bachelor of Arts",
        field: "Design",
        startDate: "2012-09-01",
        endDate: "2016-06-30"
      }
    ],
    experience: [
      {
        company: "Design Forward Co",
        position: "UI Developer",
        startDate: "2019-05-01",
        endDate: null,
        description: "Created responsive designs and implemented them with modern frontend technologies. Worked closely with UX designers to ensure designs were implemented correctly."
      },
      {
        company: "Creative Digital Agency",
        position: "Web Designer",
        startDate: "2018-07-01",
        endDate: "2019-04-30",
        description: "Designed and developed websites for clients. Worked on all aspects from wireframes to final implementation."
      }
    ],
    tests: [
      {
        id: "t2",
        type: "aptitude",
        name: "Frontend Development Assessment",
        status: "completed",
        score: 78,
        sentAt: "2023-12-07T11:00:00Z",
        completedAt: "2023-12-08T15:45:00Z"
      }
    ]
  },
  {
    id: "c3",
    name: "Michael Chang",
    email: "michael.chang@example.com",
    phone: "+1 (555) 345-6789",
    resumeUrl: "/resumes/michael-chang.pdf",
    matchScore: 85,
    skills: ["React", "TypeScript", "HTML", "CSS", "Material UI", "React Query"],
    education: [
      {
        institution: "University of Washington",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-06-30"
      }
    ],
    experience: [
      {
        company: "Enterprise Solutions",
        position: "Frontend Developer",
        startDate: "2020-01-15",
        endDate: null,
        description: "Developed enterprise web applications using React and TypeScript. Implemented complex forms and data visualization components."
      },
      {
        company: "Startup Innovations",
        position: "UI Developer",
        startDate: "2019-07-01",
        endDate: "2020-01-10",
        description: "Worked on an early-stage startup building the MVP of a SaaS product. Implemented the entire frontend from scratch."
      }
    ],
    tests: [
      {
        id: "t3",
        type: "coding",
        name: "React Coding Challenge",
        status: "sent",
        sentAt: "2023-12-10T09:15:00Z"
      }
    ]
  },
  {
    id: "c4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    resumeUrl: "/resumes/emily-rodriguez.pdf",
    matchScore: 79,
    skills: ["React", "Angular", "Vue", "JavaScript", "Bootstrap", "SCSS"],
    education: [
      {
        institution: "Georgia Tech",
        degree: "Bachelor of Science",
        field: "Information Technology",
        startDate: "2016-09-01",
        endDate: "2020-05-30"
      }
    ],
    experience: [
      {
        company: "Tech Solutions Group",
        position: "Frontend Developer",
        startDate: "2020-06-15",
        endDate: null,
        description: "Working on multiple client projects using various frontend technologies. Specialized in implementing responsive designs and animations."
      },
      {
        company: "Digital Agency",
        position: "Web Developer Intern",
        startDate: "2019-06-01",
        endDate: "2020-05-30",
        description: "Assisted in developing websites and web applications for clients. Learned multiple frameworks and libraries."
      }
    ],
    tests: [
      {
        id: "t4",
        type: "aptitude",
        name: "Frontend Development Assessment",
        status: "pending"
      }
    ]
  },
  {
    id: "c5",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1 (555) 567-8901",
    resumeUrl: "/resumes/david-kim.pdf",
    matchScore: 76,
    skills: ["React", "JavaScript", "CSS", "Tailwind", "Next.js", "Figma"],
    education: [
      {
        institution: "UC Berkeley",
        degree: "Bachelor of Arts",
        field: "Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-05-30"
      }
    ],
    experience: [
      {
        company: "Software Innovations Inc",
        position: "Frontend Developer",
        startDate: "2019-07-01",
        endDate: null,
        description: "Developing web applications with React and related technologies. Worked on improving website performance and accessibility."
      }
    ],
    tests: []
  }
];

// Associate candidates with job descriptions
mockJobDescriptions[0].candidates = [
  mockCandidates[0],
  mockCandidates[1],
  mockCandidates[2],
  mockCandidates[4]
];

mockJobDescriptions[1].candidates = [
  mockCandidates[3],
  mockCandidates[2]
];

mockJobDescriptions[2].candidates = [
  mockCandidates[1],
  mockCandidates[4]
];

export const mockTestQuestions: TestQuestion[] = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "Which of the following is not a React Hook?",
    options: ["useState", "useEffect", "useComponentDidMount", "useContext"],
    correctAnswer: 2,
    difficulty: "medium"
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "What is the correct way to pass a prop called 'name' to a React component?",
    options: ["<Component {name} />", "<Component name={name} />", "<Component props={name} />", "<Component props.name={name} />"],
    correctAnswer: 1,
    difficulty: "easy"
  },
  {
    id: "q3",
    type: "multiple_choice",
    question: "Which lifecycle method is called after a component has been rendered for the first time?",
    options: ["componentDidMount", "componentWillMount", "componentDidUpdate", "componentWillUpdate"],
    correctAnswer: 0,
    difficulty: "easy"
  },
  {
    id: "q4",
    type: "multiple_choice",
    question: "What's the correct way to create a controlled input in React?",
    options: [
      "<input value={this.state.value} />", 
      "<input value={this.state.value} onChange={this.handleChange} />", 
      "<input defaultValue={this.state.value} />", 
      "<input value={this.state.value} onChange={() => {}} />"
    ],
    correctAnswer: 1,
    difficulty: "medium"
  },
  {
    id: "q5",
    type: "coding",
    question: "Write a function that takes an array of numbers and returns the sum of all even numbers in the array.",
    difficulty: "medium"
  },
  {
    id: "q6",
    type: "coding",
    question: "Create a React functional component that displays a counter and a button to increment it. Use the useState hook.",
    difficulty: "medium"
  }
];
