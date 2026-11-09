"use client"
import { useLazyAllAccessoriesQuery } from '@/redux/api/ads.api';
import { Add, IMeta } from '@/redux/types'
import useLazyLoad from '@/shared/LazyLoadAd';
import { useRef } from 'react'
import AccessoriesCard from './AccessoriesCard';
import Image from 'next/image';

function AccessoriesItems({ query, initialData, initialMeta, notFoundMsg }: { query: { [key: string]: string | undefined }, initialData: Add[], initialMeta: IMeta, notFoundMsg?: string }) {

    const [loadAccessories, { isLoading }] = useLazyAllAccessoriesQuery();
    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {

            query.page = page.toString();

            const res = await loadAccessories(query).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<Add>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {},
        initialData: initialData,
        initialPage: initialMeta?.page ? initialMeta.page + 1 : 2,
        initialHasMore: initialMeta ? initialMeta?.page < initialMeta?.totalPage : true
    });

    return (
        <div>
            {
                (data?.length === 0 && !isLoading) && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                    <Image src={"/empty_data.jpg"} height={1000} width={1000} className='h-28 w-auto mx-auto' alt='empty data' />
                    <p className='text-sm text-gray-500 text-center'>{notFoundMsg || "No data found"}</p>
                </section>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.map(accessories => {
                    return <AccessoriesCard key={accessories?.id} accessories={accessories} />
                })}
                {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}
            </div>
            {
                isLoading && hasMore && <div className='flex justify-center items-center h-16 md:h-20 lg:h-24'>
                    <div className="w-8 lg:w-10 aspect-square rounded-full border-[4px] border-gray-200 border-r-primary animate-spin"></div>
                </div>
            }
        </div>
    )
}

export default AccessoriesItems
