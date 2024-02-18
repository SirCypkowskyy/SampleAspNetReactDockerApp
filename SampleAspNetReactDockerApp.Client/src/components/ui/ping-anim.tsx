import {cva, VariantProps} from "class-variance-authority";
import * as React from "react";

const pingAnimSizeVariants = cva(
    "h-3 w-3",
    {
        variants: {
            variant: {
                growing: "animate-ping",
                shrinking: ""
            },
            size: {
                sm: "h-3 w-3",
                md: "h-5 w-5",
                lg: "h-7 w-7",
                xl: "h-10 w-10"
            }
        },
        defaultVariants: {
            variant: "growing",
            size: "sm"
        }
    }
);


export interface PingAnimProps extends
    VariantProps<typeof pingAnimSizeVariants> 
{
    className?: string;
    bgColor?: 'bg-sky' | 'bg-red' | 'bg-blue' | 'bg-green' | 'bg-yellow' | 'bg-indigo' | 'bg-purple' | 'bg-pink';
} 

const PingAnim = React.forwardRef<HTMLSpanElement, PingAnimProps>(
    (
        { className,  variant, size,  
            bgColor = 'bg-sky' }
        , ref
    ) => {

        const pingAnimSize = pingAnimSizeVariants({size});
        const pingAnimVariant = pingAnimSizeVariants({variant});
        return (
            <span ref={ref} className={className + " relative flex " + pingAnimSize}>
                <span className={pingAnimVariant + " absolute inline-flex h-full w-full rounded-full opacity-75 " + bgColor + "-400" }>
                </span>
                <span className={"relative inline-flex rounded-full " + bgColor + "-500"}></span>
            </span>
        )
    });
  

export {PingAnim, pingAnimSizeVariants}