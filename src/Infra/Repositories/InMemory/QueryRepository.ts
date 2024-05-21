interface QueryRepository<T, K> {
    find(query: K): Promise<T | undefined>;
}

export {QueryRepository};
