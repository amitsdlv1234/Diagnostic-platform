import type {
  HealthContent,
  HealthContentPlacement,
} from "./healthContentTypes";

export const HEALTH_CONTENT_STORAGE_KEY =
  "diagnostic-health-content";

function generateId(): string {
  return `health_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getHealthContents(): HealthContent[] {
  try {
    const stored = localStorage.getItem(
      HEALTH_CONTENT_STORAGE_KEY,
    );

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as HealthContent[];
  } catch {
    return [];
  }
}

export function getHealthContent(
  id: string,
): HealthContent | null {
  return (
    getHealthContents().find(
      (item) => item.id === id,
    ) || null
  );
}

export function saveHealthContent(
  content: HealthContent,
): void {
  const contents = getHealthContents();

  const index = contents.findIndex(
    (item) => item.id === content.id,
  );

  if (index >= 0) {
    contents[index] = {
      ...content,
      updatedAt: new Date().toISOString(),
    };
  } else {
    contents.push(content);
  }

  localStorage.setItem(
    HEALTH_CONTENT_STORAGE_KEY,
    JSON.stringify(contents),
  );
}

export function createHealthContent(
  data: Omit<
    HealthContent,
    | "id"
    | "slug"
    | "createdAt"
    | "updatedAt"
  >,
): HealthContent {
  const now = new Date().toISOString();

  const content: HealthContent = {
    ...data,
    id: generateId(),
    slug: generateSlug(data.title),
    createdAt: now,
  };

  saveHealthContent(content);

  return content;
}

export function updateHealthContent(
  content: HealthContent,
): void {
  saveHealthContent(content);
}

export function deleteHealthContent(
  id: string,
): void {
  const contents = getHealthContents().filter(
    (item) => item.id !== id,
  );

  localStorage.setItem(
    HEALTH_CONTENT_STORAGE_KEY,
    JSON.stringify(contents),
  );
}

export function toggleHealthContent(
  id: string,
): void {
  const content = getHealthContent(id);

  if (!content) {
    return;
  }

  saveHealthContent({
    ...content,
    isActive: !content.isActive,
  });
}

export function getActiveHealthContents(
  placement?: HealthContentPlacement,
): HealthContent[] {
  return getHealthContents()
    .filter((item) => item.isActive)
    .filter((item) =>
      placement
        ? item.placements.includes(placement)
        : true,
    )
    .sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );
}