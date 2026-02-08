type SimpleIconProps = {
  title: string;
  path: string;
};

/**
 * 'Simple Icons' SVG icon component.
 */
export function SimpleIcon({ title, path }: SimpleIconProps) {
  return (
    <svg viewBox="0 0 24 24" role="img" className="h-7 w-7 fill-current">
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}
