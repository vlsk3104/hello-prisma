import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  // todo ここに処理を記載する
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
