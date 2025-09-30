const modules = import.meta.glob("./*.{jpg,webp}", { eager: true });

export const turkiye7Images: string[] = Object.values(modules).map(
  (mod: any) => mod.default
);

// Pick one cover image (e.g. first image)
export const turkiye7Cover = turkiye7Images[0];