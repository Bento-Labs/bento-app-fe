export const readFileAsJSON = <T>(file: File): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      return typeof reader.result === "string"
        ? resolve(JSON.parse(reader.result))
        : reject();
    };
    reader.onerror = reject;
  });
};
