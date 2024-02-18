import {ReactElement} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {EnvelopeOpenIcon} from "@radix-ui/react-icons"
import {useTranslation} from "react-i18next";

export function Home(): ReactElement {
    const { t } = useTranslation();
    
    return (
        <div className="flex flex-col justify-center h-[70%]">
            {/* Hero Section */}
            <section className="container mt-10 flex flex-col items-center text-center" id="hero-section">
                <h1 className="text-4xl text-primary font-bold mb-4">
                    {t("home.hero.title")}
                </h1>
                <p className="text-muted-foreground mb-4">
                    {t("home.hero.subtitle")}
                </p>
            </section>

            {/* Features Section */}
            <section className="container mt-10">

                <h2 className="text-3xl text-center font-bold mb-6">
                    {t("home.features.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Feature Blocks */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {t("home.features.ease.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("home.features.ease.description")}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {t("home.features.consistency.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("home.features.consistency.description")}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {t("home.features.npm.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("home.features.npm.description")}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* Register Section */}
            <section className="container mt-20 flex-col items-center text-center" id="register-section">

                <Button size="lg" variant="outline" className="px-4 mx-2">
                    <EnvelopeOpenIcon className="mr-2 h-4 w-4"/> {t("home.login")}
                </Button>

                <Button size="lg" variant="outline" className="px-4 mx-2">
                    <EnvelopeOpenIcon className="mr-2 h-4 w-4"/> {t("home.register")}
                </Button>
            </section>

        </div>
    );
}