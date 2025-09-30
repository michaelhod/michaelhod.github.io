const modules = import.meta.glob("./*.{jpg,webp}", { eager: true });

export const greeceImages: string[] = Object.values(modules).map(
  (mod: any) => mod.default
);

// Pick one cover image (e.g. first image)
export const greeceCover = greeceImages[0];