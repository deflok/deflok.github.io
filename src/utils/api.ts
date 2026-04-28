import translit from 'cyr2lat-translit';

// Базовый URL для API (автоматически подставится в браузере и на сервере)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// ==================== ТИПЫ ====================
export interface Project {
  id: number;
  title: string;
  img: string;
}

export interface Article {
  id: number;
  title: string;
}

// ==================== ПРОЕКТЫ ====================
export async function getAllProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BASE_URL}/data/projects.json`, {
      cache: 'force-cache', // Next.js кэширование
      next: { revalidate: 3600 } // обновлять каждый час
    });

    if (!res.ok) throw new Error('Ошибка загрузки проектов');

    const data = await res.json();
    return data.projects;
  } catch (error) {
    console.error('getAllProjects error:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await getAllProjects();

    const project = projects.find(a => generateSlug(a.title) === slug);

    return project || null;
  } catch (error) {
    console.error('getProjectBySlug error:', error);
    return null;
  }
}


/**
 * Получить последние N проектов
 */
export async function getLatestProjects(limit: number = 3): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.slice(0, limit);
}


// ==================== СТАТЬИ ====================
export async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${BASE_URL}/data/articles.json`, {
      cache: 'force-cache',
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error('Ошибка загрузки статей');

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error('getAllArticles error:', error);
    return [];
  }
}


export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await getAllArticles();

    const article = articles.find(a => generateSlug(a.title) === slug);

    return article || null;
  } catch (error) {
    console.error('getArticleBySlug error:', error);
    return null;
  }
}

/**
 * Получить последние N статей
 */
export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.slice(0, limit);
}



export function generateSlug(title: string): string {
  // Сначала транслитерируем русские символы в латиницу
  const latin = translit(title) || '';
  // Затем приводим к нижнему регистру, заменяем пробелы на тире и убираем лишние символы
  return latin
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // заменяем все, кроме букв и цифр, на тире
    .replace(/^-|-$/g, '');      // убираем тире в начале и конце
}