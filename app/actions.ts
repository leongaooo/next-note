'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from "zod";
import { stat, mkdir, writeFile } from 'fs/promises'
import { join, extname } from "path";
// import mime from "mime";
// 这个更正确
import mime from "mime-types";
import dayjs from 'dayjs';
import { signOut } from "@/auth"; // 你的 auth.ts 导出

const schema = z.object({
    title: z.string(),
    content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
});

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

type FormState = {
    errors?: z.ZodIssue[];
    message?: string;
}

export async function saveNote(prevState?: FormState, formData?: FormData): Promise<FormState> {
    if (!formData) {
        return {
            message: '请填写内容',
        }
    }

    // 获取 noteId
    const noteId = formData.get('noteId')
    const data = {
        title: formData.get('title'),
        content: formData.get('body'),
        updateTime: new Date()
    }

    // 校验数据
    const validated = schema.safeParse(data)
    if (!validated.success) {
        return {
            errors: validated.error.issues,
        }
    }

    // 模拟请求时间
    await sleep(1000)

    // 更新数据库
    if (noteId) {
        await updateNote(noteId as string, JSON.stringify(data))
        revalidatePath('/', 'layout')
    } else {
        await addNote(JSON.stringify(data))
        revalidatePath('/', 'layout')
    }

    return { message: `Add Success!` }
}

export async function deleteNote(prevState: FormState, formData: FormData): Promise<FormState> {
    const noteId = formData.get('noteId')
    if (noteId) {
        delNote(noteId as string)
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function importNote(formData: FormData) {
    const file = formData.get('file')

    // 空值判断
    if (!file) {
        return { error: "File is required." };
    }

    // 写入文件
    const buffer = Buffer.from(await (file as File).arrayBuffer());
    const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (e) {
        if (e instanceof Error && 'code' in e && e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(e)
            return { error: "Something went wrong." }
        }
    }

    try {
        // 写入文件
        const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
        const filename = (file as File).name.replace(/\.[^/.]+$/, "")
        const fileSuffix = mime.lookup((file as File).name) === 'text/markdown' ? 'md' : extname((file as File).name).slice(1)
        const uniqueFilename = `${filename}-${uniqueSuffix}.${fileSuffix}`;
        await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

        // 调用接口，写入数据库
        const res = await addNote(JSON.stringify({
            title: filename,
            content: buffer.toString('utf-8')
        }))

        // 清除缓存
        revalidatePath('/', 'layout')

        return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong." }
    }
}

export async function signOutAction() {
    await signOut();   // 这里可以传 { redirectTo: '/login' } 等
}

