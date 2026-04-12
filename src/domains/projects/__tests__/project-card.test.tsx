import { render, screen } from '@testing-library/react';

import type { ProjectItem } from '@/data';

import { ProjectCard } from '../components/project-card';

const baseProject: ProjectItem = {
  id: 1,
  title: 'Raven System',
  role: 'Frontend Engineer',
  description: 'A distributed message broker.',
  stack: ['React', 'TypeScript', 'Node.js'],
  isPrivate: false,
  url: 'https://example.com'
};

describe('<ProjectCard />', () => {
  it('renders the project title', () => {
    render(<ProjectCard data={baseProject} />);
    expect(screen.getByText('Raven System')).toBeInTheDocument();
  });

  it('renders the role', () => {
    render(<ProjectCard data={baseProject} />);
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ProjectCard data={baseProject} />);
    expect(screen.getByText('A distributed message broker.')).toBeInTheDocument();
  });

  it('renders stack items as badges', () => {
    render(<ProjectCard data={baseProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('shows "Open Source" badge for public projects', () => {
    render(<ProjectCard data={{ ...baseProject, isPrivate: false }} />);
    expect(screen.getByText('Open Source')).toBeInTheDocument();
  });

  it('shows "Private" badge for private projects', () => {
    render(<ProjectCard data={{ ...baseProject, isPrivate: true }} />);
    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  it('renders a Demo link when url is provided', () => {
    render(<ProjectCard data={baseProject} />);
    const link = screen.getByRole('link', { name: /demo/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('does not render a Demo link when url is null', () => {
    render(<ProjectCard data={{ ...baseProject, url: null }} />);
    expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument();
  });
});
