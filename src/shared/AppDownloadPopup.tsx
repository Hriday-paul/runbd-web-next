"use client";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { CheckCircle2, Smartphone } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const STORAGE_KEY = "runbd_app_download_popup_seen";
const APP_DOWNLOAD_URL = "https://play.google.com/store/apps/details?id=org.globalrunbd.app&pcampaignid=web_share";

const AppDownloadPopup = () => {
    const [open, setOpen] = useState(false);
    const t = useTranslations("Home.downloadApp");

    useEffect(() => {
        try {
            const hasSeen = sessionStorage.getItem(STORAGE_KEY);
            if (!hasSeen) {
                const timer = setTimeout(() => {
                    setOpen(true);
                    sessionStorage.setItem(STORAGE_KEY, "true");
                }, 1000);
                return () => clearTimeout(timer);
            }
        } catch {
            // Ignore sessionStorage access errors in restricted environments
        }
    }, []);

    const features = [t("feature1"), t("feature2"), t("feature3")];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 overflow-hidden rounded-2xl border border-stroke sm:max-w-md font-popin">
                <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-primary px-6 pt-7 pb-6 text-white relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-primary/30 blur-2xl" />
                    <DialogHeader className="text-left space-y-2 relative z-10">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1">
                            <Smartphone className="size-4 text-primary" />
                            <span className="text-xs font-medium text-white">
                                {t("badge")}
                            </span>
                        </div>
                        <DialogTitle className="text-xl sm:text-2xl font-bold text-white leading-snug pt-1">
                            {t("popupTitle")}
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            {t("popupSubtitle")}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-5 bg-white">
                    <ul className="space-y-2.5">
                        {features.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <a
                            href={APP_DOWNLOAD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center sm:justify-start gap-3 rounded-xl bg-gray-900 px-4 py-3 text-white transition hover:bg-gray-800 shadow-xs"
                        >
                            <FaGooglePlay className="size-5 text-primary shrink-0" />
                            <div className="text-left leading-tight">
                                <span className="block text-[9px] font-medium uppercase tracking-wider text-gray-300">
                                    {t("getItOn")}
                                </span>
                                <span className="block text-sm font-semibold text-white">
                                    {t("googlePlay")}
                                </span>
                            </div>
                        </a>

                        <a
                            href={APP_DOWNLOAD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center sm:justify-start gap-3 rounded-xl border border-stroke bg-gray-50 px-4 py-3 text-gray-900 transition hover:bg-gray-100"
                        >
                            <FaApple className="size-6 text-gray-900 shrink-0" />
                            <div className="text-left leading-tight">
                                <span className="block text-[9px] font-medium uppercase tracking-wider text-gray-500">
                                    {t("downloadOn")}
                                </span>
                                <span className="block text-sm font-semibold text-gray-900">
                                    {t("appStore")}
                                </span>
                            </div>
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-full py-2 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                        {t("maybeLater")}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AppDownloadPopup;
