import { VLC } from '@/app/constants'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { queryClient } from './constants/queryClient'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree: routeTree,
  basepath: `/${VLC}`,
  // defaultPendingComponent: () => <CircularWithValueLabel />,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  defaultPendingMs: 300,
  defaultPendingMinMs: 500,
  scrollRestoration: true
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      </QueryClientProvider>
    </StrictMode>
  )
}
