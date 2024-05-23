export interface QueryRepository<T, K> {
    find(query: K): Promise<T | undefined>;
}
