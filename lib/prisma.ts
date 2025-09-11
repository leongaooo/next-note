import { PrismaClient } from '@/app/generated/prisma'
import { auth } from '@/auth'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}
// 导出全局唯一实例
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query', 'error', 'warn'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// 获取所有笔记，返回 { [id: string]: string }
export async function getAllNotes(): Promise<Record<string, string>> {
    const session = await auth()
    if (!session?.user?.userId) return {}

    const notes = await prisma.note.findMany({
        where: {
            authorId: session.user.userId,
        },
    })

    const res: Record<string, string> = {}
    notes.forEach(({ title, content, id, updatedAt }) => {
        res[id] = JSON.stringify({
            title,
            content,
            updateTime: updatedAt,
        })
    })
    return res
}

export async function addNote(
    data: string, // JSON string {title, content}
): Promise<string> {
    const session = await auth()
    if (!session?.user?.userId) throw new Error('Not authenticated')

    const parsed = JSON.parse(data) as { title: string; content: string }

    const result = await prisma.note.create({
        data: {
            title: parsed.title,
            content: parsed.content,
            author: { connect: { id: session.user.userId } },
        },
    })

    return result.id
}

export async function updateNote(
    uuid: string,
    data: string,
): Promise<void> {
    const parsedData = JSON.parse(data) as { title: string; content: string }

    await prisma.note.update({
        where: { id: uuid },
        data: {
            title: parsedData.title,
            content: parsedData.content,
        },
    })
}

export async function getNote(
    uuid: string,
): Promise<{ id: string; title: string; content: string; updateTime: Date } | undefined> {
    const session = await auth()
    if (!session?.user?.userId) return

    const note = await prisma.note.findFirst({
        where: { id: uuid },
    })

    if (!note) return

    return {
        id: note.id,
        title: note.title,
        content: note.content || '',
        updateTime: note.updatedAt,
    }
}

export async function delNote(uuid: string): Promise<void> {
    await prisma.note.delete({
        where: { id: uuid },
    })
}

export async function addUser(
    username: string,
    password: string,
): Promise<{ name: string; username: string; userId: string }> {
    const user = await prisma.user.create({
        data: {
            username,
            password,
            notes: {
                create: [],
            },
        },
    })

    return {
        name: username,
        username,
        userId: user.id,
    }
}

/**
 *
 * @param username 用户名
 * @param password 密码
 * @returns 0 = 用户不存在, 1 = 密码错误, 否则用户对象
 */
export async function getUser(
    username: string,
    password: string,
): Promise<
    | 0
    | 1
    | {
        name: string
        username: string
        userId: string
    }
> {
    const user = await prisma.user.findFirst({
        where: { username },
        include: { notes: true },
    })

    if (!user) return 0
    if (user.password !== password) return 1

    return {
        name: username,
        username,
        userId: user.id,
    }
}

export default prisma
