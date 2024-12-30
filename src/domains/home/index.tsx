import { CURSOR_EFFECT_CLASSNAME } from '@/shared/constants';

export function HomePage() {
    return (
        <main className='flex flex-col items-center justify-center gap-4 w-full h-dvh'>
          <h1 className={CURSOR_EFFECT_CLASSNAME}>Ramin Rezaei</h1>
          <h3>Software Engineer</h3>
        </main>
    )
}
