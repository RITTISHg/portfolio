import { projectsData, projectSlugs } from "@/app/data/projects";

export async function generateStaticParams() {
    return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = projectsData[slug];
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} — Rittish G`,
        description: project.tagline,
    };
}

export { default } from "./ProjectPage";
