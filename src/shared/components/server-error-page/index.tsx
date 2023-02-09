export function ServerError({ onTryAgain = () => {} }: { onTryAgain: GVoidFunction }) {
  return (
    <div>
      <h3>Server Error</h3>
      <button onClick={onTryAgain}>Try Again ?</button>
    </div>
  );
}
