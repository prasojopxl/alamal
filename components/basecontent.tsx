"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

interface iBase {
    children: ReactNode
}

export default function Basecontent(props: iBase) {

    return (
        <QueryClientProvider client={queryClient}>
            <div>{props.children}</div>
        </QueryClientProvider>
    )
}
