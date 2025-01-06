import { clsx } from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { PERSONAL_DATA } from '@/data';
import { titleFont } from '@/app/fonts';
import { animator } from '@/shared/helpers';
import { ContentContainer } from '@/layout/components/content-container';
import { ResumeDownloaderButton } from '@/shared/components/resume-downloader-button';

import styles from './about-me.module.scss';

export function AboutMePage() {
  return (
    <ContentContainer className='text-center'>
      <div className='flex w-full select-none justify-center'>
        <Image
          width={384}
          height={480}
          className={clsx(
            'w-4/5 max-w-96',
            animator({ name: 'fadeIn', speed: 'slow', delay: '1s' })
          )}
          draggable={false}
          alt={PERSONAL_DATA.fullName}
          title={PERSONAL_DATA.fullName}
          src='/images/personal-images/01.png'
        />
      </div>
      <h1
        className={clsx(
          'text-left text-4xl font-extrabold',
          animator({ name: 'fadeInUp' }),
          titleFont.className
        )}
        style={{ animationDelay: `${0.3}s` }}
      >
        {`About ${PERSONAL_DATA.firstName}`}
      </h1>
      <h3
        className={clsx('mt-1 text-left text-xl', animator({ name: 'fadeInUp' }))}
        style={{ animationDelay: `${2 * 0.3}s` }}
      >
        {`${PERSONAL_DATA.fullName} | ${PERSONAL_DATA.title}`}
      </h3>
      <div
        className={clsx(
          'mb-5 mt-4 flex flex-col gap-4 text-justify text-lg',
          animator({ name: 'fadeIn', delay: '1s' }),
          styles['about-me']
        )}
      >
        <p>
          Hi, I’m <strong>Ramin Rezaei</strong>, a dedicated and ambitious{' '}
          <strong>Software Engineer</strong> with over six years of professional
          experience in designing, developing, and optimizing web applications and
          systems. Currently, I’m based in
          <strong>Malmö, Sweden</strong>, where I work as a{' '}
          <strong>Senior Frontend Engineer</strong> at{' '}
          <a href='https://www.boozt.com' target='_blank'>
            Boozt
          </a>
          , crafting innovative, high-performance solutions for e-commerce platforms
          serving millions of users across 17 countries.
        </p>
        <p>
          My professional journey has been a blend of technical challenges, impactful
          projects, and continuous learning. I specialize in
          <strong>frontend technologies</strong> such as <strong>JavaScript</strong>,{' '}
          <strong>React</strong>, <strong>TypeScript</strong>, and
          <strong>Next.js</strong>, but my expertise extends across the software
          development stack, with hands-on experience in <strong>backend systems</strong>
          built on <strong>Python (Django)</strong> and <strong>PHP (Laravel)</strong>. I
          thrive in <strong>agile environments</strong>, working with cross-functional
          teams to deliver scalable, efficient, and user-centric solutions.
        </p>
        <p>At Boozt, I have been instrumental in projects like:</p>
        <ul>
          <li>
            Building a robust <strong>content management system (CMS)</strong> that
            enables dynamic web pages, seamless mobile app integration, and improved
            operational efficiency.
          </li>
          <li>
            Optimizing system performance by implementing advanced data structures and
            algorithms to improve speed, reduce computation, and enhance data storage.
          </li>
          <li>
            Leading <strong>React and TypeScript migrations</strong>, ensuring legacy
            systems evolve to meet modern business needs with a focus on scalability and
            maintainability.
          </li>
        </ul>
        <p>
          Prior to this, I spent three impactful years at{' '}
          <Link href='https://www.linkedin.com/company/digikala/' target='_blank'>
            Digikala
          </Link>
          , where I contributed to rebuilding their e-commerce platforms, designing
          reusable components, implementing analytics services, and optimizing marketing
          platforms through
          <strong>A/B testing</strong> and <strong>automated testing pipelines</strong>.
          At{' '}
          <Link href='https://www.linkedin.com/company/snapp.ir/' target='_blank'>
            Snapp
          </Link>
          , I led a frontend team, spearheading projects like migrating systems from
          WordPress to modern frameworks, creating reusable component libraries, and
          dramatically improving user experiences.
        </p>
        <p>
          Beyond my technical contributions, I’ve always been passionate about{' '}
          <strong>mentorship and leadership</strong>. I’ve guided junior engineers,
          conducted coding bootcamps, and actively shared my knowledge with aspiring
          developers. I believe in fostering a culture of collaboration, learning, and
          innovation within every team I work with.
        </p>
        <p>
          Outside of work, I actively explore emerging technologies, including{' '}
          <strong>machine learning</strong>, and recently completed a certification in
          <strong>Machine Learning in JavaScript with TensorFlow.js</strong>. My
          dedication to the craft has been recognized with achievements like winning
          <strong>1st place in the Code in the Dark competition</strong>—a testament to my
          ability to innovate and excel under high-pressure conditions.
        </p>
        <p>
          I approach every project with curiosity and a drive to solve problems through
          elegant and efficient code. Whether it’s developing scalable APIs, optimizing
          complex systems, or creating user-friendly interfaces, I aim to deliver software
          that makes an impact.
        </p>
        <p>
          When I’m not coding, I enjoy exploring the vibrant culture of Malmö,
          experimenting with personal projects, or connecting with other professionals to
          exchange ideas and insights.
        </p>
        <p>
          <strong>Let’s collaborate</strong> to create software that not only meets
          technical demands but also inspires and empowers users around the globe.
        </p>
      </div>

      <div className='my-10 flex flex-col items-start gap-4'>
        <p className='text-xl'>You can download my resume here:</p>
        <ResumeDownloaderButton />
      </div>
    </ContentContainer>
  );
}
