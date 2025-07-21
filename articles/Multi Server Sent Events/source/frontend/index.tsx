import { render } from 'preact';
import { AppView } from './app.view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retryOnMount: false,
            retry: 10,
        },
    },
});

render(
    <QueryClientProvider client={client}>
        <AppView />
    </QueryClientProvider>
, document.body);
