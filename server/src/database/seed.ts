import { faker, pt_BR } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { prisma } from "./prismaClient";
import { IDonation } from "@/models/Donation";

async function seedUser() {
  //await prisma.user.deleteMany();
  const generateUserData = (): Prisma.UserCreateInput => ({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    bloodType: faker.helpers.arrayElement([
      "A+",
      "B+",
      "AB+",
      "O+",
      "A-",
      "B-",
      "AB-",
      "O-",
    ]),
    gender: faker.person.sexType(),
    photo: faker.image.avatar(),
    dateOfBirth: faker.date.birthdate(),
    phone: faker.phone.imei(),
    isAdmin: false,
    termsOfUseAccepted: true,
    privacyPolicy: true,
  });

  const usersData: Prisma.UserCreateInput[] = Array.from(
    { length: 30 },
    generateUserData
  );

  await prisma.user.createMany({
    data: usersData,
  });

  console.log("Seed data User inserted successfully");
}

async function seedCampaign() {
  //await prisma.campaign.deleteMany();
  const endDate = faker.date.past({
    years: 1,
    refDate: "2023-01-01T00:00:00.000Z",
  });

  const generateCampaignData = (): Prisma.CampaignCreateInput => ({
    title: faker.lorem.sentence({ min: 3, max: 5 }),
    image: faker.image.url(),
    description: faker.lorem.paragraph(1),
    local: faker.location.streetAddress(),
    startDate: faker.date.recent({
      days: 30,
      refDate: endDate,
    }),
    endDate: endDate,
  });

  const campaignData: Prisma.CampaignCreateInput[] = Array.from(
    { length: 5 },
    generateCampaignData
  );

  await prisma.campaign.createMany({
    data: campaignData,
  });

  console.log("Seed data Campaign inserted successfully");
}

async function seedDonation() {
  //await prisma.donation.deleteMany();
  const getRandomUser = async () => {
    const users = await prisma.user.findMany();
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };
  const generateDonationData =
    async (): Promise<Prisma.DonationCreateManyInput> => {
      const randomUser = await getRandomUser();

      if (!getRandomUser) {
        throw new Error("Nenhum usuário encontrado no banco de dados.");
      }

      return {
        date: faker.date.past({
          years: 1,
          refDate: "2023-01-01T00:00:00.000Z",
        }),
        donorId: randomUser.id,
        bloodType: randomUser.bloodType,
        amount: 1,
      };
    };

  const donationPromises: Promise<Prisma.DonationCreateManyInput>[] =
    Array.from({ length: 50 }, () => generateDonationData());

  const donationsData: Prisma.DonationCreateManyInput[] = await Promise.all(
    donationPromises
  );

  await prisma.donation.createMany({
    data: donationsData,
  });

  console.log("Seed data Donation inserted successfully");
}

seedUser()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

seedCampaign()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

seedDonation()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
