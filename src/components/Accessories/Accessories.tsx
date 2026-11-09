import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import AccessoriesFilter from "./AccessoriesFilter";
import { Add, IMeta } from "@/redux/types";
import { getTranslations } from "next-intl/server";
import SmFilter from "../ads/SmFilter";
import { gen_JsonLdAd } from "../JSON_LD/AdsLd";
import AccessoriesItems from "./AccessoriesItems";


async function Accessories({ adsPromise, page, limit, sort, query }: { adsPromise: Promise<{ data: { data: Add[], meta: IMeta } }>, page: number, limit?: string, sort?: string, query: { [key: string]: string | undefined } }) {

    const data = await adsPromise;
    const t = await getTranslations("category_page");

    const jsonLd = gen_JsonLdAd(data?.data?.data, "Accessories in Bangladesh | Runbd", "accessories");

    return (
        <div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                }}
            />

            <div className="flex flex-row justify-between items-center py-4">
                <div className='lg:hidden'>
                    <SmFilter filterComponent={<AccessoriesFilter />} />
                </div>
                <p className="text-gray-500 text-sm font-popin font-medium flex flex-row gap-x-1.5 items-center">
                    <PiSlidersHorizontalDuotone className="text-xl" />
                    {t("item_found", { count: data?.data?.meta?.total })}
                </p>
            </div>

            <AccessoriesItems query={query} initialData={data?.data?.data || []} initialMeta={data?.data?.meta} key={JSON.stringify(query)} notFoundMsg={t("not_found")} />

        </div>
    )
}

export default Accessories