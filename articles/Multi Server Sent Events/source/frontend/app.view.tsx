import { FunctionComponent, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TChatMessage, TUserChat } from './app.types';

export const AppView: FunctionComponent = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<TChatMessage[]>([]);

    const login = useQuery({
        queryKey: [
            'login',
        ],
        queryFn: async() => {
            const response = await axios.request<TUserChat>({
                url: 'http://localhost:3300/api/users/login',
                method: 'POST',
            })
            return response.data;
        },
    });

    const history = useQuery({
        queryKey: [
            login.data?.roomId,
            'history',
        ],
        queryFn: async() => {
            const response = await axios.request<TChatMessage[]>({
                url: `http://localhost:3300/api/chats/${login.data?.roomId}/history`,
                method: 'GET',
                headers: {
                    'X-Author': login.data?.userId ?? '',
                },
            })
            return response.data;
        },
        enabled: typeof login.data?.roomId === 'string',
    });

    useEffect(() => {
        if (Array.isArray(history.data)) {
            setMessages(history.data)
        }
    }, [
        history.data,
    ]);

    useEffect(() => {
        if (login.data?.roomId) {
            const sseURL = `http://localhost:3300/api/chats/${login.data.roomId}/subscribe?user=${login.data.userId}`;

            const eventSource = new EventSource(sseURL);

            eventSource.onmessage = (event): void => {
                const data = JSON.parse(event.data);
                setMessages((prev) => prev.concat(data));
            };

            return (): void => eventSource.close();
        }
    }, [
        login.data?.roomId,
    ]);

    const onSubmit: JSX.SubmitEventHandler<EventTarget> = (event) => {
        event.preventDefault();

        axios.request({
            url: `http://localhost:3300/api/chats/${login.data?.roomId}/send`,
            method: 'POST',
            headers: {
                'X-Author': login.data?.userId ?? '',
            },
            data: {
                text,
            },
        }).then(() => {
            setText('');
        });
    };

    return (
        <div>
            <div>
                <div>Room</div>
                <div>{login.data?.roomId}</div>
            </div>
            <div>
                <div>User</div>
                <div>{login.data?.userId}</div>
            </div>
            <form onSubmit={onSubmit}>
                <div>Messages</div>
                <input value={text} onChange={(e) => setText(e.currentTarget.value)} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {messages.map((m) => (
                        <div>{m.text}</div>
                    ))}
                </div>
            </form>
        </div>
    );
};
