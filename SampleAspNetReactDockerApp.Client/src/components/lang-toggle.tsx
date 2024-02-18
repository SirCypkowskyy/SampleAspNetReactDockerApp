import {ReactElement} from "react";
import {useLangStore} from "@/store/langStore.ts";
import {Button} from "./ui/button";
import Flag from 'react-world-flags';


export default function LangToggle(
    {
        className = "",
    }
): ReactElement {

    const lang = useLangStore((state) => state.lang);
    const setLang = useLangStore((state) => state.setLang);

    const changeLanguage = () => {
        setLang(lang === "pl" ? "en" : "pl");
    }

    return <Button variant="ghost" className={className}
                   size="icon"
                   onClick={changeLanguage} >
        {
            lang === "pl" ?
                (
                    <Flag code="pl"
                          className={"h-6"}
                          fallback={<span>Unknown flag </span>}/>
                )
                :
                (
                    <Flag code="GB"
                          className={"h-6"}
                          fallback={<span>Unknown flag </span>}/>
                )
        }
    </Button>;
}