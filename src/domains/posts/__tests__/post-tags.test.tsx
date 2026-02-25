import { render, screen } from '@testing-library/react';

import { PostTags } from '../components/post-tags';

describe('PostTags', () => {
  it('should render tags as links', () => {
    render(<PostTags postId={1} tags={['hooks', 'design']} />);
    const linkElement = screen.getByText('hooks');

    expect(linkElement.closest('a')).toBeTruthy();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/posts?tag=hooks');
  });
});
