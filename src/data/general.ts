export const GENERAL_SITE_DATA = {
  errorPage: {
    title: 'Something went wrong!',
    lines: [
      'We are experiencing an issue in our development process.',
      'We are working hard to resolve it as soon as possible.',
      'Thank you for your understanding.'
    ],
    tryAgain: 'Try again'
  },
  notFoundPage: {
    title: 'Not Found',
    description: 'Could not find requested resource',
    returnHome: 'Return Home'
  },
  aboutMe: {
    resumeText: 'You can download my resume here:'
  },
  contactMe: {
    bookMeeting: 'You can book a meeting with me:',
    personalCalendar: 'Personal Calendar',
    mentorshipCalendar: 'Mentorship Calendar'
  },
  contactForm: {
    errors: {
      recaptchaNotDetected: 'Error: reCAPTCHA not detected.',
      recaptchaFailed: 'We could not handle your reCAPTCHA element now!'
    },
    fields: {
      subject: {
        label: 'Subject',
        placeholder: 'Enter your subject',
        validation: {
          required: 'You must to enter a subject!',
          minLength: 'Your subject should be more than 10 characters'
        }
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email address',
        validation: {
          pattern: 'Your email address is invalid!',
          required: 'You must to enter your email address!'
        }
      },
      message: {
        label: 'Message',
        placeholder: 'Enter your message',
        validation: {
          required: 'You must to enter your message!',
          minLength: 'Your message should be more than 30 characters'
        }
      }
    },
    submitButton: 'Submit'
  },
  posts: {
    emptyState: {
      title: 'No posts found.',
      description: 'There are no posts that match your search or filters.',
      clearFilter: 'Clear Your Filter'
    },
    search: {
      openAriaLabel: 'Search Posts',
      closeTitle: 'Close Search',
      closeAriaLabel: 'Close Search',
      label: 'Search Posts',
      placeholder: 'Search...',
      loading: 'Loading...',
      noResults: 'No posts found.'
    },
    categoryFilter: {
      placeholder: 'Select a category ...',
      clearFilter: 'Clear Filter'
    }
  },
  projects: {
    demoLinkText: 'Demo'
  },
  lens: {
    emptyState: {
      title: 'No Lens Items Found',
      description: 'It seems there are no items in the lens yet.'
    }
  },
  cookiesModal: {
    title: 'We use cookies',
    description:
      'We use our own and third-party cookies to personalize content and to analyze web traffic.',
    reject: 'Reject',
    accept: 'Accept'
  },
  pagination: {
    previousPage: 'Previous page',
    nextPage: 'Next page',
    pageLabel: 'Page'
  },
  theme: {
    switchToDark: 'Switch to Dark Mode',
    switchToLight: 'Switch to Light Mode'
  }
} as const;
