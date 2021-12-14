// SVG
declare module '*.svg' {
  const content: any;
  export default content;
}

// JPG
declare module '*.jpg' {
  const content: any;
  export default content;
}

// CSS
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// LESS
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

// SCSS
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
