// // 融合声明
import { Blob } from 'buffer';
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        userId: string;        // 默认就有，再写一次也行
        username: string;  // ✅ 新增
    }

    interface Session {
        user: {
            userId: string;
            username: string;
            name?: string | null;
            email?: string | null;
            image: string
        };
    }
}

declare module '@auth/core/adapters' {
    interface AdapterUser {
        userId: string;
        username: string;  // ✅ 让 AdapterUser 也认识
    }
}