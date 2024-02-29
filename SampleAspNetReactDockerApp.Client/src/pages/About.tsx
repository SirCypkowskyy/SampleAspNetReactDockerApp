import {ReactElement} from "react";
import {useTranslation} from "react-i18next";

export default function About(): ReactElement {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-4xl text-primary font-bold mb-4">{t("about.title")}</h1>
            <p className="mb-4">{t("about.description")}</p>

            <h2 className="text-3xl font-bold mb-3">{t("about.featuresTitle")}</h2>
            <ul className="list-disc list-inside mb-4">
                <li>{t("home.features.ease.description")}</li>
                <li>{t("home.features.consistency.description")}</li>
                <li>{t("home.features.npm.description")}</li>
            </ul>

            <h2 className="text-3xl font-bold mb-3">{t("about.techStackTitle")}</h2>
            <p className="mb-4">.Net 8.0, React, Docker, Nginx, PostgreSQL, Tailwind CSS, Zustand, i18next</p>

            <h2 className="text-3xl font-bold mb-3">{t("about.authorTitle")}</h2>
            <p>{t("about.authorName")}</p>
            <p><a href="https://github.com/SirCypkowskyy" className="text-blue-500">{t("about.githubProfile")}</a></p>
            <p><a href="mailto:dcyprian.a.gburek@gmail.com" className="text-blue-500">{t("about.email")}: dcyprian.a.gburek@gmail.com</a></p>
        </div>
    );
}