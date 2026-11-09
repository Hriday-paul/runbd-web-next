"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Link, usePathname } from '@/i18n/navigation';
import { RiMenu3Fill } from 'react-icons/ri';
import { navitems } from './Navbar';
import Image from 'next/image';
import logo from "../../../public/logo.png"
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { categories } from "@/components/Home/Section2/Section2";

const SmNavSheet = () => {
    const tc = useTranslations('Home.section2');
    const t = useTranslations("navbar");
    const pathname = usePathname();

    const routes = navitems;

    return (
        <div>
            <Sheet>
                <SheetTrigger className='border border-stroke p-2 rounded-lg cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors duration-150'>
                    <RiMenu3Fill className="text-xl md:text-2xl text-gray-800" />
                </SheetTrigger>
                <SheetContent
                    side={'right'}
                    className="flex flex-col justify-between p-0 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                    <div>
                        <SheetHeader className="px-5 pt-5 pb-4 border-b border-stroke text-left">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetDescription className="sr-only">Mobile navigation drawer</SheetDescription>
                            <SheetClose asChild>
                                <Link href={"/"} className="inline-block w-fit">
                                    <Image src={logo} alt='logo' className='h-8 w-auto object-contain' />
                                </Link>
                            </SheetClose>
                        </SheetHeader>

                        <div className="px-4 py-4">
                            <ul className="space-y-1">
                                <li>
                                    <SheetClose asChild>
                                        <Link
                                            href={"/"}
                                            className={`flex items-center justify-between px-3 py-3 rounded-lg font-popin text-base font-medium transition-colors duration-200 group ${
                                                pathname === "/"
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-gray-800 hover:bg-gray-50 hover:text-primary"
                                            }`}
                                        >
                                            <span>{t("home")}</span>
                                            <ChevronRight
                                                size={18}
                                                className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
                                                    pathname === "/" ? "text-primary" : "text-gray-400 group-hover:text-primary"
                                                }`}
                                            />
                                        </Link>
                                    </SheetClose>
                                </li>

                                <li>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="categories" className="border-none">
                                            <AccordionTrigger className="px-3 py-3 rounded-lg font-popin text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-primary hover:no-underline transition-colors duration-200">
                                                {t("categories")}
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-1 pt-1">
                                                <div className="ml-2 pl-2 border-l border-stroke space-y-1 max-h-72 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                                                    {categories?.map((category, idx: number) => {
                                                        const isActive = pathname === category?.rout;
                                                        return (
                                                            <SheetClose asChild key={idx}>
                                                                <Link
                                                                    href={category?.rout}
                                                                    className={`flex items-center gap-x-3 px-3 py-2.5 rounded-lg transition-colors duration-150 group ${
                                                                        isActive
                                                                            ? "bg-primary/10 text-primary"
                                                                            : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                                                                    }`}
                                                                >
                                                                    <div className="w-7 h-7 rounded-md bg-primary/5 flex items-center justify-center shrink-0">
                                                                        <Image
                                                                            src={category?.icon}
                                                                            alt="runbd category icon"
                                                                            className="h-4 w-4 object-contain"
                                                                        />
                                                                    </div>
                                                                    <span className="font-popin text-sm font-normal">
                                                                        {tc(category.name)}
                                                                    </span>
                                                                </Link>
                                                            </SheetClose>
                                                        );
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </li>

                                {routes?.map((item) => {
                                    const isActive = pathname === item?.rout;
                                    return (
                                        <li key={item?.id}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={item?.rout}
                                                    className={`flex items-center justify-between px-3 py-3 rounded-lg font-popin text-base font-medium transition-colors duration-200 group ${
                                                        isActive
                                                            ? "bg-primary/10 text-primary"
                                                            : "text-gray-800 hover:bg-gray-50 hover:text-primary"
                                                    }`}
                                                >
                                                    <span>{t(item?.label)}</span>
                                                    <ChevronRight
                                                        size={18}
                                                        className={`transition-transform duration-200 group-hover:translate-x-0.5 ${
                                                            isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                                                        }`}
                                                    />
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="p-4 border-t border-stroke bg-gray-50/50">
                        <SheetClose asChild>
                            <Link
                                href="/vendor/post-ad"
                                className="flex w-full py-2.5 text-sm items-center justify-center rounded-full bg-primary px-5 font-medium text-white transition hover:opacity-95 font-popin shadow-xs"
                            >
                                + {t("btn")}
                            </Link>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default SmNavSheet;
