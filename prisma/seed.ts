import { PrismaClient, Prisma } from "@/app/generated/prisma";

const prisma = new PrismaClient();

const bookData: Prisma.BookCreateInput[] = [
    {
        title: "Book 1",
        content: "Book 1 content",
    },
    {
        title: "Book 2",
        content: "Book 2 content",
    },
];

export async function main() {
    for (const u of bookData) {
        await prisma.book.create({ data: u });
    }
}

main();