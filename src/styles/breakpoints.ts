const size = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1200px',
};

export const devices = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};
