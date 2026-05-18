import { prisma } from "./src/lib/prisma";

async function main() {
  const aeronave = await prisma.aeronave.create({
    data: {
      codigo: "ABC123",
      modelo: "Embraer 747",
      tipo: "Comercial",
      capacidade: 200,
      alcance: 5000,
    },
  });
  console.log("Created aeronave:", aeronave);

  const allAeronaves = await prisma.aeronave.findMany();
  console.log("All aeronaves:", JSON.stringify(allAeronaves, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });