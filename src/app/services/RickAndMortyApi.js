import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickMortyApi = createApi({
    reducerPath: "rickMortyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),

    endpoints: (builder) => ({

        getCharacter: builder.query({
            query: (page) => `character/?page=${page}`,
            providesTags: ['rickMorty']
        })
    })
});

export const { useGetCharacterQuery } = rickMortyApi