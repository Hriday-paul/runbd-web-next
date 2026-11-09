import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, Smartphone, ShieldCheck, Zap, Star } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import logo from "../../../../public/logo.png";

async function DownloadApp() {
    const t = await getTranslations("Home.downloadApp");

    const features = [
        t("feature1"),
        t("feature2"),
        t("feature3"),
    ];

    return (
        <section className=" pb-14 md:pb-20 lg:pb-24 font-popin">
            <div className="container">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-primary/95 border border-stroke/20 px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:px-16 lg:py-16 shadow-xl">
                    {/* Decorative background glows */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                        {/* Left Column: Text & Store Buttons */}
                        <div className="lg:col-span-7 space-y-6 text-left">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 backdrop-blur-sm">
                                <Smartphone className="text-primary size-4" />
                                <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
                                    {t("badge")}
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                                {t("title")}
                            </h2>

                            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
                                {t("description")}
                            </p>

                            <ul className="space-y-2.5 pt-1">
                                {features.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2.5 text-sm sm:text-base text-gray-200">
                                        <CheckCircle2 className="text-primary size-5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Store Download Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-3">
                                <a
                                    href="https://play.google.com/store/apps/details?id=org.globalrunbd.app&pcampaignid=web_share"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3.5 rounded-xl bg-white px-5 py-3 text-gray-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <FaGooglePlay className="size-6 text-primary transition-transform duration-200 group-hover:scale-105" />
                                    <div className="text-left leading-tight">
                                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                            {t("getItOn")}
                                        </span>
                                        <span className="block text-base font-bold text-gray-900">
                                            {t("googlePlay")}
                                        </span>
                                    </div>
                                </a>

                                <a
                                    href="https://play.google.com/store/apps/details?id=org.globalrunbd.app&pcampaignid=web_share"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3.5 rounded-xl bg-white/10 border border-white/20 px-5 py-3 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
                                >
                                    <FaApple className="size-7 text-white transition-transform duration-200 group-hover:scale-105" />
                                    <div className="text-left leading-tight">
                                        <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-300">
                                            {t("downloadOn")}
                                        </span>
                                        <span className="block text-base font-bold text-white">
                                            {t("appStore")}
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Visual Phone Mockup */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
                                {/* Floating badge top-left */}
                                <div className="hidden sm:flex absolute -left-8 top-8 z-20 items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl border border-gray-100">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Zap className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Fast & Easy</p>
                                        <p className="text-[11px] text-gray-500">1-Click Ad Post</p>
                                    </div>
                                </div>

                                {/* Floating badge bottom-right */}
                                <div className="hidden sm:flex absolute -right-6 bottom-8 z-20 items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl border border-gray-100">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                                        <Star className="size-5 fill-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">4.9 / 5 Rating</p>
                                        <p className="text-[11px] text-gray-500">Trusted Marketplace</p>
                                    </div>
                                </div>

                                {/* Phone Frame */}
                                <div className="relative mx-auto rounded-[2.25rem] border-[6px] border-gray-800 bg-white p-4 shadow-2xl">
                                    {/* Top Notch */}
                                    <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-gray-200" />

                                    {/* App Screen Header */}
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <Image src={logo} alt="Runbd" className="h-6 w-auto object-contain" />
                                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                                            + Post Ad
                                        </span>
                                    </div>

                                    {/* Mock Search & Categories */}
                                    <div className="mt-3 space-y-3">
                                        <div className="rounded-xl bg-gray-100 px-3 py-2 text-xs text-gray-400">
                                            Search cars, bikes, jobs...
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="rounded-xl bg-primary/5 p-2.5 text-center">
                                                <div className="mx-auto mb-1 h-2 w-8 rounded-full bg-primary/40" />
                                                <p className="text-[10px] font-medium text-gray-700">Cars</p>
                                            </div>
                                            <div className="rounded-xl bg-primary/5 p-2.5 text-center">
                                                <div className="mx-auto mb-1 h-2 w-8 rounded-full bg-primary/40" />
                                                <p className="text-[10px] font-medium text-gray-700">Bikes</p>
                                            </div>
                                            <div className="rounded-xl bg-primary/5 p-2.5 text-center">
                                                <div className="mx-auto mb-1 h-2 w-8 rounded-full bg-primary/40" />
                                                <p className="text-[10px] font-medium text-gray-700">Rent</p>
                                            </div>
                                        </div>

                                        {/* Mock Featured Listing Card */}
                                        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-white">
                                                    Featured
                                                </span>
                                                <ShieldCheck className="size-4 text-primary" />
                                            </div>
                                            <div className="h-2.5 w-3/4 rounded-full bg-gray-300" />
                                            <div className="h-2 w-1/2 rounded-full bg-gray-200" />
                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-xs font-bold text-primary">TK 12,50,000</span>
                                                <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-medium text-gray-700 shadow-2xs">
                                                    View
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DownloadApp;
