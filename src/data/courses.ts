export const physicsCourses = [
  {
    id: 'MATH101',
    name: 'Calculus I',
    prerequisites: [],
    description: 'Introduction to differential calculus',
    semester: 1
  },
  {
    id: 'PHYS101',
    name: 'Physics I',
    prerequisites: [],
    description: 'Classical mechanics',
    semester: 1
  },
  {
    id: 'MATH102',
    name: 'Calculus II',
    prerequisites: ['MATH101'],
    description: 'Introduction to integral calculus',
    semester: 2
  },
  {
    id: 'PHYS102',
    name: 'Physics II',
    prerequisites: ['PHYS101', 'MATH101'],
    description: 'Electricity and magnetism',
    semester: 2
  },
  {
    id: 'MATH201',
    name: 'Linear Algebra',
    prerequisites: ['MATH102'],
    description: 'Vector spaces and linear transformations',
    semester: 3
  },
  {
    id: 'PHYS201',
    name: 'Quantum Mechanics I',
    prerequisites: ['PHYS102', 'MATH102'],
    description: 'Introduction to quantum mechanics',
    semester: 3
  },
  {
    id: 'MATH202',
    name: 'Differential Equations',
    prerequisites: ['MATH201'],
    description: 'Ordinary and partial differential equations',
    semester: 4
  },
  {
    id: 'PHYS202',
    name: 'Statistical Physics',
    prerequisites: ['PHYS201'],
    description: 'Statistical mechanics and thermodynamics',
    semester: 4
  }
];