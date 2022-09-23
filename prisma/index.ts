import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  // 1件検索
  const alice = await prisma.user.findUnique({
    where: {email: 'alice@example.com'}
  })
  // sqlベタ書き
  // const email = 'alice@example.com'
  // const alice = await prisma.$queryRaw(`SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = '${email}';`)

  // リスト検索
  const users = await prisma.user.findMany()

  // join検索（ユーザ詳細）
  const bob = await prisma.user.findUnique({
    where: { email: 'bob@example.com' },
    include: { posts: true }
  })

  // join検索（投稿一覧）
  const posts = await prisma.post.findMany({
    where: {
      title: {
        startsWith: 'title'
      }
    },
    take: 5,
    orderBy: {
      id: 'asc'
    },
    include: { author: true }
  })

  console.log(alice)
  console.log(users)
  console.log(bob)
  console.log(posts)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
