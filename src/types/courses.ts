export interface Course {
  id: number;
  title: string;
  platform: string;
  institution: string;
  description: string;
  level: string;
  duration: string;
  isSpecialization: boolean;
  link: string;
  tags: string[];
  coursesCount?: number;
}
