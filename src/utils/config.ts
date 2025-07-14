import yaml from 'js-yaml';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { SiteConfig } from '../types/config';

const DEFAULT_CONFIG: SiteConfig = {
  social: {},
  personal: {
    name: 'Your Name',
    title: 'Position / Title',
    bio: 'Brief bio about yourself.',
    avatar: '/default-avatar.jpg'
  },
  navigation: {
    home: { enabled: true, label: 'Home' },
    publications: { enabled: true, label: 'Publications' },
    cv: { enabled: true, label: 'CV' },
    blog: { enabled: true, label: 'Blog' },
    gallery: { enabled: true, label: 'Gallery' },
    lecture_notes: { enabled: true, label: 'Lecture Notes' },
    curriculum: { enabled: true, label: 'Physics Curriculum' },
    certifications: { enabled: true, label: 'Certifications' },
    recommended: { enabled: true, label: 'Recommended' },
    more_dropdown: {
      enabled: true,
      label: 'More',
      items: {}
    }
  },
  theme: {
    default_mode: 'dark',
    accent_color: 'rgb(136, 58, 234)',
    accent_color_light: 'rgb(224, 204, 250)',
    accent_color_dark: 'rgb(49, 10, 101)'
  }
};

export async function getConfig(): Promise<SiteConfig> {
  try {
    const configPath = path.join(process.cwd(), 'src', 'config.yaml');
    const configFile = await fs.readFile(configPath, 'utf8');
    const config = yaml.load(configFile) as SiteConfig;
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    console.error('Error loading config:', error);
    return DEFAULT_CONFIG;
  }
}