export function BackgroundImage() {
  return (
    <>
      <div
        style={{
          width: 830,
          height: 830,
          maxWidth: '100%',
          background: 'url(/images/background.png) no-repeat',
          backgroundSize: 'contain'
        }}
        className="shine-animation-top pointer-events-none fixed left-0 top-0 blur-md"
      />
      <div
        style={{
          width: 830,
          height: 830,
          maxWidth: '100%',
          background: 'url(/images/background.png) no-repeat',
          backgroundSize: 'contain'
        }}
        className="shine-animation-bottom pointer-events-none fixed -bottom-6 right-0 rotate-180 blur-lg"
      />
    </>
  );
}
