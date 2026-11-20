import { useEffect, useReducer, useRef } from "react";

type State<T> = {
    loading: boolean;
    currentPage: number;
    data: T[];
    hasMore: boolean;
};

type Action<T> =
    | {
        type: "set";
        payload: Partial<State<T>>;
    }
    | {
        type: "onGrabData";
        payload: {
            data: T[];
            hasMore: boolean;
        };
    };

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case "set": {
            return {
                ...state,
                ...action.payload,
            };
        }

        case "onGrabData": {
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.payload.data],
                currentPage: state.currentPage + 1,
                hasMore: action.payload.hasMore,
            };
        }

        default:
            return state;
    }
};

type GrabDataResult<T> = {
    data: T[];
    hasMore: boolean;
};

type UseLazyLoadProps<T> = {
    triggerRef: React.RefObject<HTMLElement | null>;
    onGrabData: (page: number) => Promise<GrabDataResult<T>>;
    options?: IntersectionObserverInit;
    initialData?: T[];
    initialPage?: number;
    initialHasMore?: boolean;
};

const DEFAULT_ROOT_MARGIN = "400px";

const useLazyLoad = <T,>({
    triggerRef,
    onGrabData,
    options,
    initialData = [],
    initialPage = 1,
    initialHasMore = true,
}: UseLazyLoadProps<T>) => {
    const [state, dispatch] = useReducer(
        reducer<T>,
        {
            loading: false,
            currentPage: initialPage,
            data: initialData,
            hasMore: initialHasMore,
        }
    );

    // Refs so the observer callback always sees the latest values
    // without re-creating the observer on every render.
    const stateRef = useRef(state);
    stateRef.current = state;
    const onGrabDataRef = useRef(onGrabData);
    onGrabDataRef.current = onGrabData;
    const inFlightRef = useRef(false);

    const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;
    const threshold = options?.threshold;

    useEffect(() => {
        if (!state.hasMore || state.loading) return;

        const container = triggerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            async (entries) => {
                const entry = entries[0];
                const { hasMore, currentPage } = stateRef.current;
                if (!entry?.isIntersecting || !hasMore || inFlightRef.current) return;

                inFlightRef.current = true;
                observer.disconnect();
                dispatch({ type: "set", payload: { loading: true } });

                try {
                    const result = await onGrabDataRef.current(currentPage);
                    dispatch({ type: "onGrabData", payload: result });
                } catch {
                    dispatch({ type: "set", payload: { loading: false, hasMore: false } });
                } finally {
                    inFlightRef.current = false;
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(container);
        return () => observer.disconnect();
        // Re-observe after each page loads; if the trigger is still visible
        // (short page), the observer fires immediately and loads the next page.
    }, [triggerRef, rootMargin, threshold, state.hasMore, state.loading, state.currentPage]);

    return state;
};

export default useLazyLoad;
