// if that's not enough try this - https://www.npmjs.com/package/pluralize

export const pluralize = (count: number, noun: string, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;
