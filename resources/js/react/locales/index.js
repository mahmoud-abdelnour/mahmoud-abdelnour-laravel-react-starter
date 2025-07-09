export const getFiles = async () => {
  const files = import.meta.glob('./*.json');
  const modules = {};
  for (const path in files) {
      const fileName = path.replace('./', '');
      const namespace = fileName.replace('.json', '');
      try {
          const module = await files[path](); // Await the dynamic import
          modules[namespace] = JSON.parse(JSON.stringify(module.default));
      } catch (error) {
          console.error(`Error loading file ${fileName}:`, error);
      }
  }
  return modules;
};
